import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
  //  api
  import { HttpClientModule } from '@angular/common/http';
  // import { HttpClient } from '@angular/common/http';
  // import { SignalRModule } from 'ng2-signalr';
  // import { SignalRConfiguration } from 'ng2-signalr';
  import { Geolocation } from '@ionic-native/geolocation/ngx';
  import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
  import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
  import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
    //  HttpClient,
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    Geolocation,
    LocationAccuracy,
    NativeGeocoder,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
