import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addimage',
  templateUrl: './addimage.component.html',
  styleUrls: ['./addimage.component.css']
})
export class AddimageComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  imageUrl;

  ngOnInit()
  {

  }
  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    console.log("selectedFile"+this.selectedFile);
    const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9090/member-service/api/members/photos', uploadImageData)
    .subscribe(data =>
      {
        console.log(data);
      }, err=>{
        console.log(err);
      }
      );
      
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
  /*  //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );*/
  }

}
