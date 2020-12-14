import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherBlockComponent } from './components/weather-block/weather-block.component';
import { WeatherLayerRouteRoutingModule } from './weather-layer-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [WeatherBlockComponent, HomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    WeatherLayerRouteRoutingModule,
  ],
  bootstrap: [WeatherBlockComponent]
})
export class WeatherLayerModule { }
