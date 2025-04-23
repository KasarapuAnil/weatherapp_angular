import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient ,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  imports: [CommonModule,FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  city:string='';
  weatherData:any;
  loading=false;
  error:string='';
  suggetions:string[]=[];

  constructor(private http:HttpClient){}
  getWeather(){
    if(!this.city) return;
    this.loading=true;
    this.error='';
    const apikey='8d3b592a7db2c0b95834d536e5cabce1';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`;
    this.http.get(url).subscribe({
      next:(data)=>{
        this.weatherData=data;
        console.log(data,'weather data')
        this.loading=false;

      },
      error:(err)=>{
        this.error='city not found or error fetching data';
        this.loading=false;
        this.weatherData=null;
      }
    })


  };
  onCityInput() {
    if (this.city.length < 2) {
      this.suggetions = [];
      return;
    }

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': 'f3ad577f1bmsh3085a73df50153ep118f0djsn49e717908324',  // 🔁 Replace with your RapidAPI key
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    });

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${this.city}&limit=5`;

    this.http.get<any>(url, { headers }).subscribe(response => {
      this.suggetions = response.data.map((city: any) =>
        `${city.name}, ${city.countryCode}`
      );
    });
  }

  selectCity(cityName: string) {
    this.city = cityName;
    this.suggetions = [];
  }




}
