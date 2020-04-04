import { Component, OnInit } from '@angular/core';
import { Api } from '../api';
import { AgssService } from '../agss.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-flitter',
  templateUrl: './flitter.page.html',
  styleUrls: ['./flitter.page.scss'],
})
export class FlitterPage implements OnInit {
  showCasesall:any;
  categoriesView:any;
  delCase:any;
  canDelete :boolean = false;
  
  constructor(
     private api: Api , 
     private servic: AgssService ,
     private router:Router, 
     public loadingController: LoadingController,
     public alertController: AlertController,
     public toastController: ToastController ) { }

  async ngOnInit() { //start ng
  
  
  

  } //endng

  ionViewDidEnter(){
    console.log('HomePage: ionViewDidEnter')
   this.getAllCase();
   setTimeout(() => {
    this.canDelete = true;
   }, 20000);
  }

  
  async getAllCase(){ //start
    const loading = await this.loadingController.create({
      message: 'جاري تحميل البيانات '
    });
    await loading.present();
       //startshowCases
   this.api.showCases({role:'1'}).then(showCasesall =>{
    console.log(showCasesall);
    loading.dismiss()
    this.showCasesall = showCasesall;
  })   //endshowCases

  } //endgetall

  editpatpatientf(id){
    // this.router.navigateByUrl('/editpatient/'+id);
    this.router.navigateByUrl('/editall/'+id);

    

  }


  async delpatpatientf(id){
    if(this.canDelete == false)
    {
      this.ToastdeleteWait();
      return;
    }
    const loading = await this.loadingController.create({
      message: 'جاري تحميل البيانات '
    });
   //startdelCase
   this.api.delCase({role:'1' , id : id}).then(delCase =>{
    console.log(delCase);
    this.canDelete = false;
    setTimeout(() => {
      this.canDelete = true;
     }, 20000);

    loading.dismiss()
    this.getAllCase();
    this.Toastdelete();
    // this.delete();
    // this.Toastwait();
    
    this.delCase = delCase;
  })   //enddelCase
  



  }

  addcase(){

    this.router.navigateByUrl('/details');
  }

  async logout() { //logout
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'هل ترغب حقا في تسجيل الخروج ؟',
      buttons: [
        { text: 'لا', handler: () => { } },
        {
          text: 'نعم', handler: () => {
            localStorage.clear()
            this.Toastlogout();
           this.router.navigateByUrl('/home');
        }
        }
      ]
    });

    await alert.present();
  }//end logout

  async Toastlogout(){
    const toast = await this.toastController.create({
      message: 'تم الخروج بنجاح العوده الي تسجيل الدخول مره اخرى',
      duration: 2000
    });
    toast.present();
  }






  async delete(id) { //logout
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'هل تريد الحذف حقا؟',
      buttons: [
        { text: 'لا', handler: () => { } },
        {
          text: 'نعم', handler: () => {
            // localStorage.clear()
            // this.Toastdelete();
          //  this.router.navigateByUrl('/flitter');
          this.delpatpatientf(id);
        }
        }
      ]
    });

    await alert.present();
  }//end logout

  async Toastdelete(){
    const toast = await this.toastController.create({
      message: '   تم الحذف بنجاح انتظر 20 ثانيه ليتم الحذف مره اخرى',
      duration: 2000
    });
    toast.present();
  }


  filtterby(e){
    console.log(e.detail.value)
      console.log(this.showCasesall)
      console.log(this.showCasesall.filter(
        (item)=> item.status_ar.includes(e.detail
          .value)))
  }
  filterByKeyword(k: string) {
    // const k = keyword.toLowerCase();
    this.categoriesView = this.showCasesall.map(x => Object.assign({}, x));
    this.categoriesView = this.categoriesView.filter((category) => {
        category.products = category.products.filter(
          (product)=> product.title.toLowerCase().includes(k));

        return category.products.length>0 }
      );
    if(this.categoriesView.length===0){
      this.categoriesView = this.showCasesall.map(x => Object.assign({}, x));
    }
  }

  // async Toastwait() { //start ng
  //   const loading = await this.loadingController.create({
  //     message: 'انتظر 20 ثانيه ليتم الحذف مره اخرى  '
  //   });
  //   await loading.present();
  
  

  // } //endng

  async ToastdeleteWait(){
    const toast = await this.toastController.create({
      message: 'انتظر 20 ثانيه ليتم الحذف مره اخرى  ',
      duration: 2000
    });
    toast.present();
  }

}
