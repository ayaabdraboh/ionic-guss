import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Router
} from '@angular/router';
import {
  Api
} from '../api';
import {
  AgssService
} from '../agss.service';
import {
  NgForm
} from '@angular/forms';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  ToastController, NavController
} from '@ionic/angular';
import {
  LoadingController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';




@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.page.html',
  styleUrls: ['./editpatient.page.scss'],
})
export class EditpatientPage implements OnInit {
  showCasesallarray: any[]
  private logInForm: FormGroup;
  id;
  showCasesall: any;
  addressValue;
  getCaseById: any;
  f_name: string;
  age: string;
  casedata: any;
  address: string;
  case: any;
  fa_name: string;
  fam_name: string;
  public citizen: boolean = true; // country2
  nationality: any;
  countriesall: any;
  nationality_country: any;
  number_type: any;
  id_number: any;
  mobile: any;
  number_type_id: any;
  gender: any;
  coordinates_type: any;
  latitudeValue;
  longitudeValue;
  latitude: any;
  longitude: any;
  phc_name: any;
  medicalcenter: any;
  governorates: any;
  region_name: any;
  regions: any;
  governorate_name: any;
  village_name: any;
  selectDiseases: string = '1';
  diseasesall: any;
  disease_name: any;
  day_of_onset: any;
  date_of_diagnosis: any;
  disease1_type_name: any;
  disease2_type_name: any;
  disease3_type_name: any;
  country2: boolean = true; // country2
  disease_arrival: any;
  disease1_country: any;
  disease2_country: any;
  disease3_country: any;
  theForm: FormGroup;
  public submitAttempt: boolean = false;
  logined_user_id: any
  errorMessage: any;
  // private logInForm: FormGroup;
  public now: boolean = true; 
  status_ar: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api,
    private servic: AgssService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,

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
      nationality_country: ['', Validators.compose([])],
      number_type: ['', Validators.compose([])],

      mobile: ['', Validators.compose([Validators.required])],
      id_number: ['', Validators.compose([])],
      number_type_id: ['', Validators.compose([])],
      gender: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      coordinates_type: ['', Validators.compose([])],
      latitude: ['', Validators.compose([])],
      longitude: ['', Validators.compose([])],
      address: ['', Validators.compose([])],
      phc_name: ['', Validators.compose([])],
      region_name: ['', Validators.compose([])],
      governorate_name: ['', Validators.compose([])],
      village_name: ['', Validators.compose([Validators.required])],
      disease_name: ['', Validators.compose([])],
      day_of_onset: ['', Validators.compose([])],
      date_of_diagnosis: ['', Validators.compose([])],
      disease1_type_name: ['', Validators.compose([])],
      disease2_type_name: ['', Validators.compose([])],
      disease3_type_name: ['', Validators.compose([])],
      status_ar: ['', Validators.compose([])],
      disease_arrival: ['', Validators.compose([])],
      disease1_country: ['', Validators.compose([])],
      disease2_country: ['', Validators.compose([])],
      disease3_country: ['', Validators.compose([])],

    
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

    if (key == 'required') {
      message = `حقل ${fieldTranslated} مطلوب`;
    }

    if (key == 'minlength' || key == 'maxlength') {
      console.log(valueTranslated);
      valueTranslated = this.theForm.controls[field].errors[key].requiredLength;
      console.log(valueTranslated);
    }

    //   // this.translate.get(key, { value: valueTranslated }).subscribe((res) => {
    //   //   message = res;
    //   // });
    return message;
  }

















  async ngOnInit() { //nginit
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
      loading.dismiss()
      //this.showCasesallarray = showCasesallarray.cases;
      // this.showCasesallarray.forEach(element => {
      //if(element.id==this.route.snapshot.params['id']){
      //  this.casedata=element
      console.log(JSON.stringify(this.casedata))
      this.f_name = showCasesallarray.case.f_name;
      this.fa_name = showCasesallarray.case.fa_name;
      this.fam_name = showCasesallarray.case.fam_name;
      this.nationality = showCasesallarray.case.nationality_id;
      this.nationality_country = showCasesallarray.case.nationality_country;
      this.number_type = showCasesallarray.case.number_type;
      this.id_number = showCasesallarray.case.id_number;
      this.mobile = showCasesallarray.case.mobile;
      this.number_type_id = showCasesallarray.case.number_type_id;
      this.gender = showCasesallarray.case.gender_id;
      this.age = showCasesallarray.case.age;
      this.coordinates_type = showCasesallarray.case.coordinates_type_id;
      this.address = showCasesallarray.case.address;
      this.latitude = showCasesallarray.case.latitude;
      this.longitude = showCasesallarray.case.longitude;
      this.phc_name = showCasesallarray.case.phc_name;
      this.region_name = showCasesallarray.case.region_name;
      this.governorate_name = showCasesallarray.case.governorate_name;
      this.village_name = showCasesallarray.case.village_name;
      this.disease_name = showCasesallarray.case.disease_id;
      this.day_of_onset = showCasesallarray.case.day_of_onset;
      this.date_of_diagnosis = showCasesallarray.case.date_of_diagnosis;
      this.disease1_type_name = showCasesallarray.case.disease_name;
      this.disease2_type_name = showCasesallarray.case.disease_name;
      this.disease3_type_name = showCasesallarray.case.disease_name;
      this.status_ar = showCasesallarray.case.status_ar;
      this.disease_arrival = showCasesallarray.case.disease_arrival;
      this.disease1_country = showCasesallarray.case.disease_country;
      this.disease2_country = showCasesallarray.case.disease_country;
      this.disease3_country = showCasesallarray.case.disease_country;

      

      console.log(this.case)
    })
    //});

    //})   //endshowCases



    //2--startcountry,
    this.api.countries({}).then(data => {
      console.log('this is the data ===>', data);
      loading.dismiss()

      this.countriesall = data;
    }) //end country

    //3--startphcs
    this.api.phcs({
      role: '1',
      user_id: '1'
    }).then(medicalcenter => {
      console.log(medicalcenter);
      loading.dismiss()

      this.medicalcenter = medicalcenter;
    }) //endphcs


    //4--startregions
    this.api.regions({
      role: '1',
      user_id: '1'
    }).then(regions => {
      console.log(regions);
      loading.dismiss()
      this.regions = regions;
    }) //endregions





  } //nginit

  //1--moakade
  selectstatus() {
    if (this.case == '0') {
      this.case = 'مشتبه بيها'
    }
    if (this.case == '1') {

      this.case = 'موكدة'
    }
    if (this.case == '2') {
      this.case = 'سلبيه'
    }
  }


  //2--suady or notsuady
  RadioChangeeventCi(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "0") {
      this.citizen = true;
    } else {
      this.citizen = false;

    }
  } //end suady


  // 3--ekama and hedood
  RadioChangeeventC(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "1") {}
  } //ekama and hedood


  //4-- id_number
  RadioChange(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "0") {
      this.citizen = true;
    }
  } //end id_number

  // 5--female and male
  RadioChangeeventF(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "1") {}
  } //female and male


  // 6--now
  RadioChangeN(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "0") {}
  } //now

 //map
 RadioChangeNQ(e) {
  if (e.detail.value == "1") {
    this.now = true;
  }else {
    this.now = false;
  }
}


  //7-yes or no
  RadioChangeYY(e) {
    console.log("e", e.detail.value);
    if (e.detail.value === "1") {
      this.country2 = false;
    } else {
      this.country2 = true;

    }
  }

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
    })

  } //end malarya and wady


  ionViewWillEnter() {
    console.log('HomePage: ionViewWillEnter')


  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter')

    console.log("did  enter register")
    this.addressValue = this.api.userLocation
    this.latitudeValue = this.api.userLat
    this.longitudeValue = this.api.userlng
  }




  //starteditCase
  userInfo(info: NgForm) {
    console.log('info value', info.value);
    if (this.case == 'مشتبه بيها') {
      info.value.showcase = '0'
    }
    if (this.case == 'موكدة') {
      info.value.showcase = '1'

    }
    if (this.case == 'سلبيه') {
      info.value.showcase = '2'
    }





    var userData = {
    }

    //editCase
    this.api.editCase(userData).then(editCase => {
      console.log(editCase);
      // loading.dismiss()

      this.router.navigateByUrl('/flitter');

    }) //endeditCase


  }

  //api goverment
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


}