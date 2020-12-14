import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { of } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherBlockComponent implements OnInit {
  public cityValue = ''
  private cachedWeatherData: any
  public selectedWeatherData: any
  public editMode = true;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  cityAutocompleteCallback(cityName: string){
    if(!!cityName){
      const apiCall = this.weatherService.getCities(cityName)
      apiCall.subscribe((results: any)=>{
        this.cachedWeatherData = results.list
      })
      return apiCall
    }
    return of([])
  }

  onCitySelect(value: any){
    this.cityValue = value;
  }

  fetchWeatherFromCache(name: string){
    return this.cachedWeatherData.find((each: any)=>{
      return (each.name === this.cityValue)
    })
  }

  showCityWeather(){
    this.editMode = false;
    if(this.cityValue){
      this.selectedWeatherData = this.fetchWeatherFromCache(this.cityValue)
    }
  }

  getWeatherBackgroundClass(){
    return this.selectedWeatherData.weather[0].main.toLowerCase()
  }
  getWeatherDesc(){
    return this.selectedWeatherData.weather[0].description
  }
  getTemperature(){
    return `${this.selectedWeatherData.main.temp + 0 - 273.15}°C`
  }

}
