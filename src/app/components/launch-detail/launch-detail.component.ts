import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Launch } from 'src/app/models/launch';
import { SpaceStorageService } from 'src/app/services/space-storage.service';

@Component({
  selector: 'dept-launch-detail',
  templateUrl: './launch-detail.component.html',
  styleUrls: ['./launch-detail.component.scss']
})
export class LaunchDetailComponent implements OnInit {

  flight_number: number = 0;
  keyLaunches: string = 'launches';
  launches: Launch[] = [];
  launch: Launch | undefined;

  favorites: number[] = [];
  keyFav: string = 'favorites';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: SpaceStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.flight_number = this.activatedRoute.snapshot.params['flight_number'];
    console.log(this.flight_number);
    this.launches = this.storageService.get(this.keyLaunches);
    if(this.launches && this.launches.length){
      this.launch = this.launches.find(x => x.flight_number == this.flight_number);
      this.checkIsFav()
    }
  }
  checkIsFav() {
    let preFav: number[] = this.storageService.get(this.keyFav);
    if(preFav.find(x => x == this.flight_number)){
      if(this.launch){
        this.launch.isFav = true;
      }
    }
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  setFavorite(){

    if(this.launch && this.launch.isFav){
      this.launch.isFav = false;
      if(this.favorites && this.favorites.length){
        this.favorites = this.favorites.filter(x => {
          return x != this.flight_number
        });

        this.storageService.set(this.keyFav, this.favorites);
      }
    }
    else if(this.launch){
      
      if(!this.favorites.find(x => x == this.flight_number)){
        this.favorites.push(this.flight_number);
        this.storageService.set(this.keyFav, this.favorites);
      }
      this.launch.isFav = true;
    }
  }



}
