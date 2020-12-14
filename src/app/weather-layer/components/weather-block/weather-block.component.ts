import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-block',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherBlockComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
