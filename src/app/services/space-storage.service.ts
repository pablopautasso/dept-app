import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpaceStorageService {

  private prefix: string = 'space';

  constructor() { }

  getKey(key: string){
    return this.prefix + '-' + key;
  } 

  public get(key: string): any {
    if(!key) return 0;

    let value = localStorage.getItem(this.getKey(key));
    if(!value) return 0;

    let parseValue = JSON.parse(value);
    return parseValue;
  }

  public set(key: string, value: any){
    let valueStore = JSON.stringify(value);
    localStorage.setItem(this.getKey(key), valueStore)
  }

}
