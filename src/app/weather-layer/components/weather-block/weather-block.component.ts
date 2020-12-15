import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { of } from 'rxjs';
import { WeatherDataSyncService } from '../../services/weather-data-sync.service';
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
  private lastFetchTime!: Date;
  @Input() blockId!: number;
  constructor(private weatherService: WeatherService, private weatherDataSyncService: WeatherDataSyncService) { }

  ngOnInit(): void {
    this.syncWithStore()
    this.weatherDataSyncService.refreshStore.subscribe(()=>{
      this.syncWithStore()
    })
  }

  syncWithStore(){
    const storeData = this.weatherDataSyncService.fetchFromStore(this.blockId)
    if(storeData){
      this.selectedWeatherData = storeData;
      this.selectedCityValue = storeData.name;
    }
  }

  cityAutocompleteCallback(cityName: string){
    if(!!cityName){
      const apiCall = this.weatherService.getCities(cityName)
      apiCall.subscribe((results: any)=>{
        this.cachedWeatherData = results.list
        this.lastFetchTime = new Date()
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
    return this.weatherDataSyncService.extractWeatherData(data)
  }

  showCityWeather(){
    this.editMode = false;
    if(this.cityValue){
      this.selectedCityValue = this.cityValue
      this.selectedWeatherData = this.fetchWeatherFromCache(this.cityValue)
      this.weatherDataSyncService.syncToStore(this.selectedWeatherData, this.blockId+'')
    }
  }

  clearInput(){
    this.cityValue = ''
    this.selectedCityValue = ''
    this.selectedWeatherData = null
    this.editMode = false;
    this.weatherDataSyncService.syncToStore(undefined, this.blockId+'')
  }
}
