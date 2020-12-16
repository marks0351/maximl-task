import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject, zip } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataSyncService {
  private readonly storeKey = 'weatherStoreKey'
  private refreshSubject = new Subject();
  constructor(private weatherService: WeatherService) {
    this.initStore();
    this.startSyncingWeatherData();
  }

  private initStore(){
    const store = localStorage.getItem(this.storeKey)
    if(!store){
      localStorage.setItem(this.storeKey, JSON.stringify({}))
    }
  }

  public get refreshStore(){
    return this.refreshSubject.asObservable()
  }

  private startSyncingWeatherData(){
    setTimeout(()=>{
      const subscriptions: Array<Observable<any>> = []
      Object.entries(this.weatherStore).forEach(([blockId, data]: any)=>{
        if(blockId && data){
          const apiObs = this.weatherService.getCities(data.name)
          apiObs.subscribe((results: any)=>{
            const data = this.extractWeatherData(results.list[0])
            this.syncToStore(data, blockId)
          })
          subscriptions.push(apiObs)
        }
      })
      this.startSyncingWeatherData();
      zip(subscriptions).subscribe(()=>{
        this.startSyncingWeatherData();
      })
    }, 30000)
  }

  public extractWeatherData(data : any){
    return {
      name: data.name,
      styleClass: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      temperature: `${(data.main.temp + 0 - 273.15).toFixed(2)}°C`,
      updatedAt: new Date()
    }
  }

  public syncToStore(data: any, blockId : string){
    const syncData = {
      ...this.weatherStore,
      [blockId]: data
    }
    return localStorage.setItem(this.storeKey, JSON.stringify(syncData))
  }

  private get weatherStore(){
    return JSON.parse(localStorage.getItem(this.storeKey) || '{}')
  }

  public fetchFromStore(blockId: any){
    return this.weatherStore[blockId]
  }
}
