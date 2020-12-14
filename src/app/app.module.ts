import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherLayerModule } from './weather-layer/weather-layer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WeatherLayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
