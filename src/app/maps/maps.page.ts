import { Component, OnInit } from '@angular/core';
import {  ViewChild, ElementRef } from '@angular/core';
// import { MashgalkoService } from '../mashgalko.service';
import { Api } from '../api';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import {GoogleMaps, GoogleMapOptions,GoogleMap,GoogleMapsEvent,LatLng,Environment} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  map: GoogleMap;
  address = 'Loading address ....';
  mapEvent: any;
  request = {} as Request;
  target = { lat: 0, lng: 0 };
  locationAccess: boolean;

  constructor(
    private geolocation: Geolocation,
    private locationAccuracy: LocationAccuracy,
    private nativeGeocoder: NativeGeocoder,
    private api: Api , 

    // public servic:MashgalkoService
  ) { }

  ngOnInit() {
    this.loadMap();
    this.locationAccess = false;
  }

  loadMap() {
      
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat:  24.774265,
            lng: 46.738586
          },
          zoom: 10,
          tilt: 30,
        },
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions); //
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
        this.locationAccuracy.canRequest().then(
          (canRequest: boolean) => {
            console.log('canRequest', canRequest);
            if (canRequest) {
              // the accuracy option will be ignored by iOS
              this.locationAccuracy
                .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
                .then(
                  () => {
                    //=========================================
                    // get possition
                    //-----------------------------------------
                    let locOptions = {
                      enableHighAccuracy: true,
                    };

                    this.getLocation(locOptions);
                  },
                  error => {

                    console.log('Error requesting location permissions', error);
                  }
                );
            } else { 
              let locOptions = {
                enableHighAccuracy: false,
              };
              this.getLocation(locOptions);
            }
          },
          error => {
            console.log('error', error);
          }
        );
      });
  }

  getLocation(locOptions) {
    this.geolocation.getCurrentPosition(locOptions).then(
      resp => {
        this.target.lat = resp.coords.latitude;
        this.target.lng = resp.coords.longitude;
console.log("user location = ",this.target.lat," , ",this.target.lng);
this.api.userLat = this.target.lat

this.api.userlng = this.target.lng

        let position = {
          target: new LatLng(resp.coords.latitude, resp.coords.longitude),
          zoom: 17,
          tilt: 30,
        };
        this.geocoderFN(this.target);
        this.map.animateCamera(position);
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5,
        };

        this.mapEvent = this.map
          .on(GoogleMapsEvent.MAP_DRAG_END)
          .subscribe(data => {
            this.address = 'Getting Location ...';
            let loc = this.map.getCameraTarget();
            this.target.lat = loc.lat;
            this.target.lng = loc.lng;

            // this.req.userLat = target.lat;
            // this.req.userLng = target.lng;
            this.geocoderFN(this.target);
          });
      },
      error => {
        console.log('Error requesting location permissions', error);
      }
    );
    //------ End get current possition----------------
  }

  geocoderFN(target) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 2,
    };

    this.nativeGeocoder
      .reverseGeocode(target.lat, target.lng, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address =
          JSON.stringify(result[0].countryName) +
          ', ' +
          JSON.stringify(result[0].administrativeArea) +
          ', ' +
          JSON.stringify(result[0].subAdministrativeArea) +
          ', ' +
          JSON.stringify(result[0].thoroughfare);
          console.log("thisaddress = ",this.address)
          this.api.userLocation = this.address
          
        this.locationAccess = true;
      })
      .catch((error: any) => {
        this.address = 'Unknown!';
      });
  }

  ngOnDestroy() {
    this.map.clear();
  }
}

