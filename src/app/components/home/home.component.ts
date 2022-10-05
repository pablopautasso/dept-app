import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs';
import { Launch } from 'src/app/models/launch';
import { Rocket } from 'src/app/models/rocket';
import { SpaceDataService } from 'src/app/services/space-data.service';
import { SpaceStorageService } from 'src/app/services/space-storage.service';

@Component({
  selector: 'dept-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: boolean = true;
  launches: Launch[] = [];
  keyLaunches: string = 'launches';

  constructor(
    private spaceData: SpaceDataService,
    private router: Router,
    private storageService: SpaceStorageService
    ) { }

  ngOnInit(): void {
    this.getLaunchesWithRockets()
  }


  getLaunchesWithRockets() {

    this.spaceData.getLaunches()
      .pipe(
        concatMap(launches => this.spaceData.getRockets()
          .pipe(
            map(rockets => {
              return launches.map(x => {
                let rocket: Rocket | undefined = rockets.find(_roc => _roc.rocket_id === x.rocket.rocket_id);
                if (rocket && rocket.rocket_id) {
                  x.rocket.active = rocket.active;
                  x.rocket.company = rocket.company;
                  x.rocket.cost_per_launch = rocket.cost_per_launch;
                }
                return x;
              })
            })
          )
        )
      )
      .subscribe({
        next: launchesWithInfo => {
          console.log(launchesWithInfo);
          this.launches = launchesWithInfo;
          this.loading = false;
        }, error: (error) => {
          this.loading = false;
        }
      });

  }

  goToDetail(launch: Launch){
    this.storageService.set(this.keyLaunches, this.launches)
    this.router.navigate([`launchDetail/${launch.flight_number}`])
  }

}
