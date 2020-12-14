import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppId} from '../../shared/config/openweatherapi.constant'
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly cityAutoCompleteUrl = 'https://api.openweathermap.org/data/2.5/find'
  constructor(private http: HttpClient) { }

  getCities(cityName: string){
    return this.http.get(this.cityAutoCompleteUrl, {params: {q: cityName, appid: AppId}})
  }
}
