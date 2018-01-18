# MovieLocations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.
I could spend around 10 hrs on the task, in given time. So I have developed the front end (which I am most comfortable with) of the service and written the logic for selecting movies (required for autocompletion) from the data in the frontend service itself, rather than creating an API endpoint. The data is kept at the client side itself, and I have used binary search to get the movie results. Google Maps API is used to get the coordinates based on the location. The map is then rendered using Angular Google Maps components. I have implemented debouncing to optimize the autocomplete feature. Once the user selects the movie, all the locations that the movie was shot in are displayed to him as a text list and are also marked on the map.

Problem Statement

Create a web app that shows on a map where movies have been filmed in San Francisco. The user should be able to filter the view using autocompletion search.

Development server

Make sure you have node and npm installed.

npm install

npm start

Tech involved

Node.js - Used to setup the server.
Angular - Angular is really efficient and scalable, and is also framework that I am most comfortable with.
Angular Google Maps - Angular wrapper around Google Maps, chosen as it is really easy to setup, and provides all functionality needed for the project.
GoogleMapsGeocodingAPI - Used to get latitude and longitude data for the locations.
