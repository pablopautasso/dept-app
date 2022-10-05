import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch';
import { Rocket } from '../models/rocket';

@Injectable({
  providedIn: 'root'
})
export class SpaceDataService {

  private baseUrl: string = 'https://api.spacexdata.com/v3/';

  constructor(private httpClient: HttpClient) { }

  getRockets(): Observable<Rocket[]>{
    return this.httpClient.get<Rocket[]>(this.baseUrl + `rockets`)
  }

  getLaunches(): Observable<Launch[]>{
    return this.httpClient.get<Launch[]>(this.baseUrl + `launches`)
  }


}
