import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./listcities.component.css']
})
export class ListcitiesComponent implements OnInit{
  cities: any;

  constructor(private citiesRepo: CitiesRepository){

  }

  async ngOnInit() {
    //this.citiesRepo.sortCities();
    this.cities = await this.citiesRepo.getAllCities();    
  }
}
