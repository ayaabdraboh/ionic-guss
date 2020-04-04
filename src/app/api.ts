import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { Cat, Customer, Filter, NewsObject, Product, PublicObject, model, brand, device, recordcustomer, customerImage, recordprovider, slidesObject, rateproduct, notificationObject, Confirmpayment,modal, CartAdd } from '../data/objects';

const API_STORAGE_KEY = 'specialkey';

@Injectable({
    providedIn: 'root'
})

export class Api {
    apiUrl = 'https://agss-jazanu.com/_ser_api/';
    [x: string]: any;

    public userLat 
    public userlng
    public userLocation = ""
    constructor(private http: HttpClient) {
    }

         //  ----------------------------------------  countries  الدول  ------------------------------------- 

    countries(object: any) {

      

            const headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


            const data = JSON.stringify(object);
            return new Promise((resolve, reject) => {
                this.http.post(this.apiUrl + 'countries', data, { headers: headers })
                    .subscribe(data => {
                        console.log(data);
                        resolve(data);
                    }, error => {
                        console.log(error);
                        reject(error);
                    });
          
        });

    }  //end countries

    
    //.................................................... phcs المراكز الصحيه
    phcs(object: any) {

      

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


        const data = JSON.stringify(object);
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl + 'phcs', data, { headers: headers })
                .subscribe(data => {
                    console.log(data);
                    resolve(data);
                }, error => {
                    console.log(error);
                    reject(error);
                });
      
    });

    }  //end phcs
   
//.................................................... regions المنطقه 
regions(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'regions', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end phcs

//.................................................... governorates المحافظه 
governorates(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'governorates', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end phcs

//.................................................... diseasesTypes انواع المرض 
diseasesTypes(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'diseasesTypes', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end phcs


//.................................................... newCase اضافه حاله
newCase(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'newCase', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
    });

}  //end newCase


//.................................................... showCases وضع حاله
showCases(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'showCases', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end newCase


// ------------------------get case by id صفحه التعديل
getCaseById(object: any) {

      

    const headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    

    // const data = {
    //     'case_id':parseInt( id),
    //     'role_id':1
    // };
    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'getCaseById', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end getCaseById


//.................................................... editCase    تعديل
editCase(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'editCase', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end newCase

//.................................................... delete  حذف
delCase(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'delCase', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end newCase


//.................................................... delete  حذف
allRegions(object: any) {

      

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');


    const data = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'allRegions', data, { headers: headers })
            .subscribe(data => {
                console.log(data);
                resolve(data);
            }, error => {
                console.log(error);
                reject(error);
            });
  
});

}  //end newCase


}
