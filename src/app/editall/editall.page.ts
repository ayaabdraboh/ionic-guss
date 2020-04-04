import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { NgForm} from '@angular/forms';
import { Api} from '../api';
import { AgssService} from '../agss.service';
import { LoadingController, ToastController, NavController} from '@ionic/angular';
import {  AlertController} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-editall',
  templateUrl: './editall.page.html',
  styleUrls: ['./editall.page.scss'],
})
export class EditallPage implements OnInit {

  theForm: FormGroup;
  errorMessage: any;
  countriesall: any;
  medicalcenter: any;
  addressValue;
  latitudeValue;
  longitudeValue;
  regions: any;
  governorates: any;
  diseasesall: any;
  showCasesall: any;
  headercolor: string = "";
  public citi: string = "";
  public citizen: boolean = true; 
  public country2: boolean = true; // country2
  private logInForm: FormGroup;
  public submitAttempt: boolean = false;
  logined_user_id: any
  selectDiseases: string = 'malarya';
  public now: boolean = true; 

  public calender = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  f_name: any;
  fa_name: any;
  fam_name: any;
  nationality: any;
  nationality_country: any;
  number_type: any;
  id_number: any;
  mobile: any;
  number_type_id: any;
  gender: any;
  age: any;
  coordinates_type: any;
  address: any;
  longitude: any;
  latitude: any;
  village_name: any;
  disease_name: any;
  day_of_onset: any;
  disease3_arrival: any;
  disease2_arrival: any;
  disease1_arrival: any;
  status_nu: any;
  disease1_country: any;
  disease2_country: any;
  disease3_country: any;
  disease3_type_name: any;
  disease2_type_name: any;
  disease1_type_name: any;
  date_of_diagnosis: any;
  casedata: any;
  id: any;
  governorate_name: number;
  region_name: number;
  village: any;
  nationality_country_id:any;
  phc_id:any;
  region_id:any;
  governorate_id:any;
  phc_name: any;
  phcs: any;
  region: any;
  governorate: any;
  disease_type:any;
  disease_arrival_no:any;

  constructor(
    private router: Router,
    private api: Api,
    private servic: AgssService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private storage: Storage,
    private route: ActivatedRoute,

  ) { 

    this.citizen = true;
    //موظف استقبال
    this.storage.get('user_id').then((userid) => {
      if (userid != null) {
        console.log(userid)
        this.logined_user_id = userid
      } else {
        console.log(userid)
      }

    })

    // Validators.required
    const FormGroup = {
      f_name: ['', Validators.compose([Validators.required])],
      fa_name: ['', Validators.compose([Validators.required])],
      fam_name: ['', Validators.compose([Validators.required])],
      nationality_country: ['', Validators.compose([])],
      number_type: ['', Validators.compose([])],
      mobile: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10),Validators.required])],
      id_number: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10),Validators.required])],
      number_type_id: ['', Validators.compose([])],
      gender: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      coordinates_type: ['', Validators.compose([Validators.required])],
      latitude: ['', Validators.compose([])],
      longitude: ['', Validators.compose([])],
      address: ['', Validators.compose([])],
      phcs: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      governorate: ['', Validators.compose([Validators.required])],
      village: ['', Validators.compose([Validators.required])],
      disease: ['', Validators.compose([Validators.required])],
      day_of_onset: ['', Validators.compose([Validators.required])],
      date_of_diagnosis: ['', Validators.compose([Validators.required])],
      disease1_type: ['', Validators.compose([])],
      disease2_type: ['', Validators.compose([])],
      disease3_type: ['', Validators.compose([])],
      case_status: ['', Validators.compose([])],
      nationality: ['', Validators.compose([Validators.required])],
      disease1_arrival: ['', Validators.compose([])],
      disease2_arrival: ['', Validators.compose([])],
      disease3_arrival: ['', Validators.compose([])],
      disease1_country: ['', Validators.compose([])],
      disease2_country: ['', Validators.compose([])],
      disease3_country: ['', Validators.compose([])],
      id: ['', Validators.compose([])],
      user_id: this.logined_user_id
    };
    this.theForm = this.formBuilder.group(FormGroup);
    }

  PostForm() {
    this.submitAttempt = true;
    console.log("form data:", this.theForm);
    // return ;
    console.log(this.theForm.value);
    if (this.theForm.valid) {
      /* || 1 */

    const data = this.theForm.value;
    console.log('data has posted ', data);

    this.api.editCase(data).then((newCase: any) => {
    console.log(newCase);
     
    if (newCase.reason == "success") {
    // this.router.navigateByUrl('/flitter');
    this.navCtrl.navigateRoot(['/flitter']);
        } else {
        }
      }) //endeditcase
    this.errorMessage = null;
    }
  }
  getErrorMessage(field, fieldTranslated = null) {
    let message;
    let valueTranslated = fieldTranslated;
    const key = Object.keys(this.theForm.controls[field].errors)[0];
    console.log(key)
    if (key == 'required') {
      message = `حقل ${fieldTranslated} مطلوب`;
    }else if (key == 'minlength') {
      console.log(valueTranslated);
      valueTranslated = this.theForm.controls[field].errors[key].requiredLength;
      console.log(valueTranslated);
      message = `الحد الادنى ${fieldTranslated}`;
    }else if (key == 'maxlength') {
      console.log(valueTranslated);
      valueTranslated = this.theForm.controls[field].errors[key].requiredLength;
      console.log(valueTranslated);
      message = `الحد الاقصي ${fieldTranslated}`;
    }


    //   // this.translate.get(key, { value: valueTranslated }).subscribe((res) => {
    //   //   message = res;
    //   // });
    return message;
  }



  ionViewDidEnter() {
    console.log("did  enter register")
    this.addressValue = this.api.userLocation
    this.latitudeValue = this.api.userLat
    this.longitudeValue = this.api.userlng
  }


async ngOnInit() { //start ngINit
  const loading = await this.loadingController.create({
    message: 'جاري تحميل البيانات '
  });
  await loading.present();

  //id
  const Id = this.route.snapshot.params['id'];
  this.id = Id;
  console.log('id adv =>', Id); //end id

  //1--startshowCases
  this.api.getCaseById({
    case_id: Id,
    role_id: 1
  }).then((showCasesallarray: any) => {
    console.log(" getcase" + JSON.stringify(showCasesallarray))
   
    if(showCasesallarray.nationality == 0)
    {
      // this.theForm.controls['number_type'].setValidators([]);
      this.theForm.controls['number_type'].clearValidators();
      // number_type  mobile
      
    }
    console.log(JSON.stringify(this.casedata))
    this.f_name = showCasesallarray.case.f_name;
    this.fa_name = showCasesallarray.case.fa_name;
    this.fam_name = showCasesallarray.case.fam_name;
    this.nationality = showCasesallarray.case.nationality_id;

    this.nationality_country_id = showCasesallarray.case.nationality_country_id;
    console.log(222222);

    this.number_type = showCasesallarray.case.number_type_id;
    this.id_number = showCasesallarray.case.id_number;
    this.mobile = showCasesallarray.case.mobile;
    this.number_type_id = showCasesallarray.case.number_type_id;
    this.gender = showCasesallarray.case.gender_id;
    this.age = showCasesallarray.case.age;
    this.coordinates_type = showCasesallarray.case.coordinates_type_id;
    this.address = showCasesallarray.case.address;
    this.latitude = showCasesallarray.case.latitude;
    this.longitude = showCasesallarray.case.longitude;
    this.phc_id = showCasesallarray.case.phc_id;
    console.log(2);

    this.region_id = showCasesallarray.case.region_id;
    this.governorate_id= showCasesallarray.case.governorate_id;
    this.village = showCasesallarray.case.village_name;
    this.disease_name = showCasesallarray.case.disease_id;
    this.day_of_onset = showCasesallarray.case.day_of_onset;
    this.date_of_diagnosis = showCasesallarray.case.date_of_diagnosis;
    
   if(this.disease_name=='1'){
      this.disease1_type_name = showCasesallarray.case.disease_name;

  }else if(this.disease_name=='2'){
    this.disease2_type_name = showCasesallarray.case.disease_name;

   }else if(this.disease_name=='3'){
   
    this.disease3_type_name = showCasesallarray.case.disease_name;
   }
    //5--startdiseasesTypes
  this.api.diseasesTypes({
    disease_type: this.disease_name
  }).then(diseasesall => {
    console.log('....000...',diseasesall);
    loading.dismiss()

    this.diseasesall = diseasesall;
    this.disease_type = showCasesallarray.case.disease_type;
  }) //enddiseasesTypes

//   if(this.status_nu=='1'){
//     this.status_nu = showCasesallarray.case.status_nu;

// }else if(this.status_nu=='2'){
//   this.status_nu = showCasesallarray.case.status_nu;

//  }else if(this.status_nu=='0'){
 
//   this.status_nu = showCasesallarray.case.status_nu;
//  }



   
   this.disease_type = showCasesallarray.case.disease_type;
    console.log('diseaaaaaase type:',this.disease_type);
    this.status_nu = showCasesallarray.case.status_nu;
    this.disease1_arrival = showCasesallarray.case.disease_arrival_no;
    this.disease2_arrival = showCasesallarray.case.disease_arrival_no;
    this.disease3_arrival = showCasesallarray.case.disease_arrival_no;
    this.disease_arrival_no = showCasesallarray.case.disease_arrival_no;
    if(showCasesallarray.case.disease_arrival_no == 1){
      this.country2 = false;
    }
      //2--startcountry,
  this.api.countries({}).then(data => {
    console.log('this is the data ===>', data);
    loading.dismiss()
    console.log(1111111); 
    this.countriesall = data;
    this.nationality_country = this.nationality_country_id;
    this.disease1_country = showCasesallarray.case.disease_country_id;
    this.disease2_country = showCasesallarray.case.disease_country_id;
    this.disease3_country = showCasesallarray.case.disease_country_id;
    console.log(1111111); 

  }) //end country
    // this.disease1_country = showCasesallarray.case.disease_country;
    // this.disease2_country = showCasesallarray.case.disease_country;
    // this.disease3_country = showCasesallarray.case.disease_country;

  })
  
  // //2--startcountry,
  // this.api.countries({}).then(data => {
  //   console.log('this is the data ===>', data);
  //   loading.dismiss()
  //   console.log(1111111); 
  //   this.countriesall = data;
  //   this.nationality_country = this.nationality_country_id;
  //   console.log(1111111); 

  // }) //end country

  //3--startphcs
  this.api.phcs({
    role: '1',
    user_id: '1'
  }).then(medicalcenter => {
    console.log(medicalcenter);
    loading.dismiss()

    this.medicalcenter = medicalcenter;
    this.phc_name= this.phc_id;
    console.log(11); 

  }) //endphcs

  //4--startregions
  this.api.regions({
    role: '1',
    user_id: '1'
  }).then(regions => {
    console.log(regions);
    loading.dismiss()

    this.regions = regions;
    this.region = this.region_id;

  }) //endregions



  // //5--startdiseasesTypes
  // this.api.diseasesTypes({
  //   disease_type: '1'
  // }).then(diseasesall => {
  //   console.log(diseasesall);
  //   loading.dismiss()

  //   this.diseasesall = diseasesall;
  // }) //enddiseasesTypes



  //6--startshowCases
  this.api.showCases({
    role: '1'
  }).then(showCasesall => {
    console.log(showCasesall);
    loading.dismiss()
    localStorage.getItem("user_id"),

      this.showCasesall = showCasesall;
  }) //endshowCases
 
}



async getGovernment(id) {
  console.log(event);

  //startgovernorates
  const loading = await this.loadingController.create({
    message: 'جاري تحميل البيانات '
  });
  this.api.governorates({ region_id: id}).then(governorates => {
    console.log(governorates);
    loading.dismiss()

    this.governorates = governorates;
    this.governorate = this.governorate_id;

  }) //endgovernorates
}
checkCitizen(cit) {
  console.log(cit);
}


//startnewcase
userInfo(info: NgForm) {
  console.log('info value', info.value);

  var userData = {
    // "f_name": info.value.f_name,
    // "fa_name": info.value.fa_name,
    // "fam_name": info.value.fam_name,
    // "id_number": info.value.id_number,
    // "mobile": info.value.mobile,
    // "number_type": info.value.number_type,
    // "age": info.value.age,
    // "village": info.value.village,
    // "diseses": info.value.diseses,
    // "phcs": info.value.phcs,
    // "latitude": this.servic.userLat,
    // "longitude": this.servic.userlng,
    // "address": info.value.address,
  }
  //editCase
  this.api.editCase(userData).then(editCase => {
    console.log(editCase);

    this.navCtrl.navigateRoot(['/flitter']);

  }) //endeditCase

}

showcase() {
  // this.router.navigateByUrl('/flitter');
  this.navCtrl.navigateRoot(['/flitter']);


}





  // id_number هويه
  RadioChange(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "0") {
      this.citizen = true;
    }
  } //end id_number

  //suady or notsuady
  RadioChangeeventCi(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "1") {
      
      this.citizen = true;
    } else {
      this.citizen = false;

    }
    if(this.nationality != e.detail.value )
    {

    this.id_number='';
    this.mobile='';
    }
  } //end suady

  //map
  RadioChangeNQ(e) {
    if (e.detail.value == "1") {
      this.now = true;
    }else {
      this.now = false;
    }
  }


// ekama and hedood
RadioChangeeventC(e) {
  console.log("e", e.detail.value);
  if (e.detail.value === "1") {}
} //ekama and hedood

// female and male
RadioChangeeventF(e) {
  console.log("e", e.detail.value);
  if (e.detail.value === "1") {}
} //female and male

// malarya and wady
RadioChangeD(e) {
  this.disease_type='';
  // this.disease2_type_name='';
  // this.disease3_type_name='';

  console.log("e", e.detail.value);
  this.selectDiseases = e.detail.value;
  //startdiseasesTypes
  this.api.diseasesTypes({
    disease_type: e.detail.value
  }).then(diseasesall => {
    console.log(diseasesall);

    this.diseasesall = diseasesall;
  }) //enddiseasesTypes
  //if (e.detail.value === "malarya") {
  //  }
  // /////////////////////////////////
} //end malarya and wady


// now
RadioChangeN(e) {
  console.log("e", e.detail.value);
  if (e.detail.value === "0") {}
} //now

// start yes or no 
RadioChangeY(e) {
  console.log("e", e.detail.value);
  if (e.detail.value === "1") {
    this.citizen = true;
  } else {
    this.citizen = false;

  }
} //end yes or no // start yes or no 
RadioChangeYY(e) {
  console.log("e", e.detail.value);
  if (e.detail.value === "1") {
    this.country2 = false;
  } else {
    this.country2 = true;

  }
} //end yes or no 



}