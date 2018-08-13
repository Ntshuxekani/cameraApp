import { Component } from '@angular/core';
import { NavController,AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';


@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
  isOn:boolean;
public photos : any;
public base64Image : string;


constructor(public navCtrl: NavController,private camera: Camera,private alertCtrl : AlertController,private platform:Platform, private flash:Flashlight) {}
ngOnInit() {
  this.photos = [];
  this.platform.ready().then(()=>{
  this.updateFlashlightstatus();
    })


}
toggle():void{
  this.flash.toggle();
  this.updateFlashlightstatus();
  }
updateFlashlightstatus(){
this.isOn=this.flash.isSwitchedOn();

}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

takePhoto(){

  const options : CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  

  this.camera.getPicture(options) .then((imageData) => {
    this.base64Image = "data:image/jpeg;base64," + imageData;
    this.photos.push(this.base64Image);
    this.photos.reverse();

    
  }, (err) => {
    console.log(err);
  });
    
}

deletePhoto(index) {
this.photos.splice(index, 1);
let confirm =this.alertCtrl.create({
title: 'Sure you want to delete this photo?',
message:'',
buttons:[
  {
    text: 'No',
    handler: () => {
      console.log('Disagree clicked');
    }
  },{
    text: 'Yes',
    handler: () =>{
      console.log('Agree clicked');
          this.photos.splice(index, 1);
    }
  }
]
});
confirm.present();
}
Gallery(){
 const options : CameraOptions = {
   quality: 100,
   destinationType: this.camera.DestinationType.DATA_URL,
   sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType: this.camera.MediaType.PICTURE,
   correctOrientation:true,
   saveToPhotoAlbum:true
 }
 this.camera.getPicture(options) .then((imageData) => {
   this.base64Image = "data:image/jpeg;base64," + imageData;
   this.photos.push(this.base64Image);
   this.photos.reverse();
 }, (err) => {
   console.log(err);
 });
 }
 
}