import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import {HttpClientJsonpModule} from '@angular/common/http'
import { WeatherBlockComponent } from './components/weather-block/weather-block.component';
import { WeatherLayerRouteRoutingModule } from './weather-layer-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { WeatherService } from './services/weather.service';



@NgModule({
  declarations: [WeatherBlockComponent, HomePageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    WeatherLayerRouteRoutingModule,
  ],
  providers: [WeatherService],
  bootstrap: [WeatherBlockComponent]
})
export class WeatherLayerModule { }
