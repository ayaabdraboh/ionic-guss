import {Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { NgForm} from '@angular/forms';
import { Api} from '../api';
import {AgssService} from '../agss.service';
import {LoadingController,ToastController, NavController
} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {Validators,FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
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
  public citizen: boolean = true; // country2
  public country2: boolean = false; // country2
  private logInForm: FormGroup;
  public submitAttempt: boolean = false;
  logined_user_id: any
  selectDiseases: string = 'malarya';
  public now: boolean = true; // country2

  public calender = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }


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
    const FormGroup = {
      f_name: ['', Validators.compose([Validators.required])],
      fa_name: ['', Validators.compose([Validators.required])],
      fam_name: ['', Validators.compose([Validators.required])],
      number_type: ['', Validators.compose([])],
      nationality_country: ['', Validators.compose([])],
      mobile: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(10),Validators.required])],
      id_number: ['',  Validators.compose([Validators.minLength(5), Validators.maxLength(10),Validators.required])],
      // Id_number: ['', Validators.compose([])],
      age: ['', Validators.compose([Validators.required])],
      village: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([])],
      coordinates_type: ['', Validators.compose([Validators.required])],
      time: ['', Validators.compose([])], // address, phcs, regions, govern..., village, disease, start_date, end_date, diseses, showcase,choosename
      // nationality_country: ['', Validators.compose([Validators.required])],

      address: ['', Validators.compose([])],
      phcs: ['', Validators.compose([Validators.required])],
      region: ['', Validators.compose([Validators.required])],
      governorate: ['', Validators.compose([Validators.required])],
      disease1_type: ['', Validators.compose([])],
      disease2_type: ['', Validators.compose([])],
      disease3_type: ['', Validators.compose([])],
      disease: ['', Validators.compose([Validators.required])],
      day_of_onset: ['', Validators.compose([Validators.required])],
      date_of_diagnosis: ['', Validators.compose([Validators.required])],
      case_status: ['', Validators.compose([])],
      disease1_arrival: ['', Validators.compose([])], // 
      disease2_arrival: ['', Validators.compose([])], // 
      disease3_arrival: ['', Validators.compose([])], // 
      nationality: ['', Validators.compose([Validators.required])],
      disease1_country: ['', Validators.compose([])],
      disease2_country: ['', Validators.compose([])],
      disease3_country: ['', Validators.compose([])],
      latitude: ['', Validators.compose([])],
      longitude: ['', Validators.compose([])],
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
      data.user_id = localStorage.getItem('user_id');
      console.log('data has posted ', data);

      this.api.newCase(data).then((newCase: any) => {
        console.log(newCase);
        // loading.dismiss()
        if (newCase.reason == "success") {
          // this.router.navigateByUrl('/flitter');
          this.navCtrl.navigateRoot(['/flitter']);

        } else {
          // this.ToastWrongCredintials()
        } //end if

      }) //endnewCase
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


async ngOnInit() { //start ngINit
  const loading = await this.loadingController.create({
    message: 'جاري تحميل البيانات '
  });
  await loading.present();

  //startcountry,
  this.api.countries({}).then(data => {
    console.log('this is the data ===>', data);
    loading.dismiss()

    this.countriesall = data;
  }) //end country

  //startphcs
  this.api.phcs({
    role: '1',
    user_id: '1'
  }).then(medicalcenter => {
    console.log(medicalcenter);
    loading.dismiss()

    this.medicalcenter = medicalcenter;
  }) //endphcs

  //startregions
  this.api.regions({
    role: '1',
    user_id: '1'
  }).then(regions => {
    console.log(regions);
    loading.dismiss()

    this.regions = regions;
  }) //endregions



  //startdiseasesTypes
  this.api.diseasesTypes({
    disease_type: '1'
  }).then(diseasesall => {
    console.log(diseasesall);
    loading.dismiss()

    this.diseasesall = diseasesall;
  }) //enddiseasesTypes



  //startshowCases
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
  this.api.governorates({
    region_id: id
  }).then(governorates => {
    console.log(governorates);
    loading.dismiss()

    this.governorates = governorates;
  }) //endgovernorates
}
checkCitizen(cit) {
  console.log(cit);
}

//startnewcase
userInfo(info: NgForm) {
  console.log('info value', info.value);

  var userData = {


    "f_name": info.value.f_name,
    "fa_name": info.value.fa_name,
    "fam_name": info.value.fam_name,
    "id_number": info.value.id_number,
    "mobile": info.value.mobile,
    "number_type": info.value.number_type,
    "age": info.value.age,
    "village": info.value.village,
    "diseses": info.value.diseses,
    "phcs": info.value.phcs,
    "latitude": this.servic.userLat,
    "longitude": this.servic.userlng,
    "address": info.value.address,


  }


}

showcase() {
  // this.router.navigateByUrl('/flitter');
  this.navCtrl.navigateRoot(['/flitter']);


}



async logout() { //logout
  const alert = await this.alertController.create({
    // header: 'Alert',
    // subHeader: 'Subtitle',
    message: 'هل ترغب حقا في تسجيل الخروج ؟',
    buttons: [{
        text: 'لا',
        handler: () => {}
      },
      {
        text: 'نعم',
        handler: () => {
          localStorage.clear()
          this.Toastlogout();
          // this.router.navigateByUrl('/home');
          this.navCtrl.navigateRoot(['/home']);

        }
      }
    ]
  });

  await alert.present();
} //end logout

async Toastlogout() {
  const toast = await this.toastController.create({
    message: 'تم الخروج بنجاح العوده الي تسجيل الدخول مره اخرى',
    duration: 2000
  });
  toast.present();
}


} ///end cose