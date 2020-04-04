import { Component } from '@angular/core';
import { AgssService } from '../agss.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {ToastController, NavController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  theForm: FormGroup;
  errorMessage: any ;

constructor(  
    public servic:AgssService,
    private router: Router,
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    public toastController: ToastController,
    private storage: Storage,
    ) {

      const FormGroup = {
        user_name: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
        // negotiable: [false],
        // contact_name: ['', Validators.compose([Validators.required , Validators.minLength(5), Validators.maxLength(50)])],
        // email: ['', Validators.compose([Validators.required , Validators.minLength(5), Validators.maxLength(50), Validators.email])],
        // phone: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(30)])],
        // phone_hidden: [false],
        // type: ['create'],
      };
      this.theForm = this.formBuilder.group(FormGroup);

    }

    PostForm() {
      console.log(this.theForm);
      console.log(this.theForm.value);
      if (this.theForm.valid) { /* || 1 */

        const data = this.theForm.value;
        console.log('data has posted ', data);
  
        this.servic.signup(data,res=>{
          console.log("res :",res)
          //start if
          
          if(res.status == "true"){
            // this..('/details');
            localStorage.setItem('user_id' , res.user_id)
            this.navCtrl.navigateRoot(['/details']);
          }else{
            this.ToastWrongCredintials()
          } //end if
          
        },err=>{
          
          console.log("err :",err)
        })
        this.errorMessage = null;
      }
    }



  ngOnInit() {
  }

  userInfo(info: NgForm) {
    console.log(info.value);

    var userData = {
      "password": info.value.password,
      "user_name": info.value.user_name,
      // "user_id":localStorage.getItem("user_id"),

    }
    
    console.log(userData);
    this.servic.signup(userData,(res:any)=>{
      console.log("res :",res)
    //   {   login response
    //     "status": "wrong_password",
    //     "user_id": 0,
    //     "role": 0
    // }
    //localStorage.setItem("user_id",res.user_id)
    
      //start if
      if(res.status == "true"){
        // this.storage.set("user_id",res.user_id)
        localStorage.setItem('user_id' , res.user_id)
        this.router.navigateByUrl('/details');
        // console.log( "user id before save"+ res.user_id)
        // this.storage.set("user_id",res.user_id)
      }else{
        this.ToastWrongCredintials()
      } //end if
      
    },err=>{
      
      console.log("err :",err)
    })
    info.reset(); 
     
  }


  async ToastError(){
    const toast = await this.toastController.create({
      message: 'يرجي ادخال كافة الحقول',
      buttons: ['حسنا'],
      duration: 2000
    });
    toast.present();
  }

  async ToastWrongPhone(){
    const toast = await this.toastController.create({
      message: ' من فضلك انتظر',
      duration: 1000
    });
    toast.present();
  }

  async ToastWrongCredintials(){
    const toast = await this.toastController.create({
      message: ' بيانات الدخول غير صحيحه ',
      duration: 2000
    });
    toast.present();
  }


}


