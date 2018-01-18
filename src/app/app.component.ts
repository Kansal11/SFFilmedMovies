import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from './shared/commonService';
import request from 'request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movieTitle : string = '';
  searchItems: any[];
  locations = [];
  getResults: Subscription;
  titleSelected: boolean = false;
  currentMovieLocationsCoordinates = [];
  mapOptions = {
    lat : 37.7749295,
    lng : -122.4194155,
    zoom: 12
  };

  constructor(private commonService:CommonService) {

  }

  ngAfterViewInit() {
    var input: any = document.getElementById('search');
    var self = this;
    const search = Observable.fromEvent(input, 'keyup').debounceTime(500)
        .do(() => {
            if (input.value == '') {
                this.searchItems = null;
            }
        })
        .switchMap(function() {
            return self.commonService.findInMovies(input.value);
        });

    this.getResults = search.subscribe(
        (response: any) => {
            if (response) {
                if (this.movieTitle) {
                    this.searchItems = response;
                    this.titleSelected = false;
                    //this.getGeoCoordinates(encodeURIComponent(this.location));
                } else {
                    this.searchItems = null;
                }
            }
        }
    );
  }

  onTitleSelect(title:any) {
    this.movieTitle = title;
    this.titleSelected = true;
    //need to empty this.locations
    this.locations = this.commonService.getLocationsForSelectedMovie(title);
    console.log(this.locations);
    this.locations.forEach((locationObj)=>{
      this.getGeoCoordinates(encodeURIComponent(locationObj.locations));
    });
  }

  getGeoCoordinates(address: string) {
    console.log(address);
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
      json: true
    }, (error, response, body) => {
      if(error){
        console.log('Unable to fetch coordinates');
      }
      else if(body.status === 'ZERO_RESULTS'){
        console.log('Unable to find the address');
      }
      else if(body && body.results && body.results.length>0 && body.results[0].geometry && body.results[0].geometry.location){
        this.currentMovieLocationsCoordinates.push({
          'lat':body.results[0].geometry.location.lat,
          'lng': body.results[0].geometry.location.lng
        });
      }
    });
    
  }

  ngOnDestroy() {
    this.getResults.unsubscribe();
  }

}
