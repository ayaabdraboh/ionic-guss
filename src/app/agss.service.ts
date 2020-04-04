import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgssService {
  userLocation: any;
  userLat: any;
  userlng: any;
  constructor(public http: HttpClient) { }


//  ----------------------------------------  signup تسجيل جديد  ------------------------------------- 
signup(userData, success, fail) {
  let headers = new HttpHeaders();
  headers = headers.set("Content-Type", "application/json");
  headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

//   let params = new HttpParams().set("phone", userData.phone).set("name",userData.name).set("password",userData.password).set("email",userData.email).set("city_id",userData.city_id).set("region",userData.region)
//  .set("role", userData.role).set("player_id", userData.player_id).set("caetgory_id", userData.caetgory_id);

let params = new HttpParams().set("password",userData.password).set("user_name",userData.user_name);

  this.http.post<any>("https://agss-jazanu.com/_ser_api/login", userData, {
      headers: headers
    }).subscribe(
      response => {
        console.log("login result" + JSON.stringify(response));
        success(response);
      },
      err => {
        fail(err);
      }
    );

}

//  ----------------------------------------  newcase  اضافه  ------------------------------------- 
newcase(userData, success, fail) {
  let headers = new HttpHeaders();
  headers = headers.set("Content-Type", "application/json");
  headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

//   let params = new HttpParams().set("phone", userData.phone).set("name",userData.name).set("password",userData.password).set("email",userData.email).set("city_id",userData.city_id).set("region",userData.region)
//  .set("role", userData.role).set("player_id", userData.player_id).set("caetgory_id", userData.caetgory_id);

// let params = new HttpParams().set("password",userData.password).set("user_name",userData.user_name);

  this.http
    .post<any>("https://agss-jazanu.com/_ser_api/newCase", userData, {
      headers: headers
    })
    .subscribe(
      response => {
        console.log("login result" + JSON.stringify(response));
        success(response);
      },
      err => {
        fail(err);
      }
    );

}






}
