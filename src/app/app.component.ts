import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { CommonService } from './shared/commonService';

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
            else {
              this.locations = [];
              this.commonService.currentMovieLocationsCoordinates = [];
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
    this.locations = this.commonService.getLocationsForSelectedMovie(title);
    this.commonService.getGeoCoordinatesForMovie(title);
  }

  ngOnDestroy() {
    this.getResults.unsubscribe();
  }

}
