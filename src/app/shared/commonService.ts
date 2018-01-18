import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CommonService{
    private isSorted:boolean = false;
    private locationList: any;
    
    public searchResults = [];
    public HashOfMovieLocations = {};

    constructor(private http:Http) {
        this.http.get('./../assets/locations.json')
            .subscribe(res => {
                this.locationList = res.json();
            });
    }
 
    private sortList = function() {
        this.locationList.sort( function(a,b) {            
            if(a.title < b.title) {
                return -1;
            }
            if(a.title > b.title){
                return 1;
            }
            return 0;
        })
    }

    findInMovies = function(description:string) {       
        if(!this.isSorted) {  
            this.sortList();
            this.isSorted = true;
            console.log(this.locationList);
        }
        this.searchResults = [];
        this.HashOfMovieLocations = {};
        return this.searchLocationList(this.locationList.slice(), description.toUpperCase());                
    }
    
    searchLocationList = function(copyOfLocationList:any, description:string) {
        var mid = Math.floor(copyOfLocationList.length / 2);
        if (copyOfLocationList.length>0 && copyOfLocationList[mid].title.toUpperCase().slice(0,description.length) === description) {
            this.searchResults.push(copyOfLocationList[mid].title);
            this.addToHash(copyOfLocationList[mid]);
            this.searchBefore(copyOfLocationList.slice(0,mid), description);
            this.searchAfter(copyOfLocationList.slice(mid+1), description);
        } else if (copyOfLocationList.length>0 && copyOfLocationList[mid].title.toUpperCase().slice(0,description.length) < description && copyOfLocationList.length > 1) {
            this.searchLocationList(copyOfLocationList.splice(mid+1), description);
        } else if (copyOfLocationList.length>0 && copyOfLocationList[mid].title.toUpperCase().slice(0,description.length) > description && copyOfLocationList.length > 1) {
            this.searchLocationList(copyOfLocationList.splice(0,mid), description);
        } else {
            console.log('not found');
        }
        console.log(this.searchResults);
        console.log(this.HashOfMovieLocations);
        return Observable.of(this.searchResults);
    }

    searchBefore(list, searchTerm) {
        for(let i=list.length-1; i>=0; i--) {
            if(list[i].title.slice(0,searchTerm.length).toUpperCase().toString() === searchTerm) {
                if(this.searchResults.indexOf(list[i].title) === -1){
                    this.searchResults.push(list[i].title);
                }
                this.addToHash(list[i]);
            }
            else {
                break;
            }
        }
    }

    searchAfter(list, searchTerm) {
        for(let i=0; i<list.length; i++) {
            if(list[i].title.slice(0,searchTerm.length).toUpperCase().toString() === searchTerm) {
                //starting from now
                if(this.searchResults.indexOf(list[i].title) === -1){
                    this.searchResults.push(list[i].title);
                }
                this.addToHash(list[i]);               
            }
            else {
                break;
            }
        }
    }

    addToHash(item:any) {
        if(!this.HashOfMovieLocations[item.title]) {
            this.HashOfMovieLocations[item.title] = [];
        }  
        this.HashOfMovieLocations[item.title].push(item);
    }

    getLocationsForSelectedMovie(title: string) {
        return this.HashOfMovieLocations[title];
    }

}