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
  public selectedCityValue = ''
  private cachedWeatherData: any
  public selectedWeatherData: any
  public editMode = false;
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
    const data = this.cachedWeatherData.find((each: any)=>{
      return (each.name === this.selectedCityValue)
    })
    return {
      name: this.selectedCityValue,
      styleClass: data.weather[0].main.toLowerCase(),
      description: data.weather[0].description,
      temperature: `${(data.main.temp + 0 - 273.15).toFixed(2)}°C`
    }
  }

  showCityWeather(){
    this.editMode = false;
    if(this.cityValue){
      this.selectedCityValue = this.cityValue
      this.selectedWeatherData = this.fetchWeatherFromCache(this.cityValue)
    }
  }

  clearInput(){
    this.cityValue = ''
    this.selectedCityValue = ''
    this.selectedWeatherData = null
    this.editMode = false;
  }


}
