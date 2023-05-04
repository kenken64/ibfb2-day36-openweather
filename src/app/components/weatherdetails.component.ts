import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Weather } from '../model/weather';
import { CitiesRepository } from '../services/cities.repo';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit, OnDestroy{
  openweatherApiKey: string = environment.openWeatherApiKey;
  private city: string = "London";
  // private country? : string;
  // private imageUrl? : string;
  params$! : Subscription;
  model = new Weather(this.city, 0,0,0,"", "", 0,0);

  constructor(private weatherSvc: WeatherService, private router:Router,
      private activatedRoute: ActivatedRoute, private citiesRepo: CitiesRepository){

  }
  ngOnInit(): void {
      this.params$ = this.activatedRoute.params.subscribe(
        (params)=>{
          this.city = params['city'];
        }
      );
      this.getWeatherDetailsFromAPI(this.city);
  }

  ngOnDestroy(): void {
    this.params$.unsubscribe();    
  }

  getWeatherDetailsFromAPI(city: string){
    this.weatherSvc.getWeather(city, this.openweatherApiKey)
      .then( async (result) => {
        console.log(result);
        const cityImageUrl = await this.citiesRepo
                                .getCityImageUrl(city);
        this.model =  new Weather(
          city,
          result.main.temp,
          result.main.pressure,
          result.main.humidity,
          result.weather[0].description,
          cityImageUrl,
          result.wind.degree,
          result.wind.speed
        )
      }).catch( (err)=> {
        console.log(err);
        this.router.navigate(['']);
      })
  }


}
