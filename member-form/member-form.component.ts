import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  currentItemId: number;
  item: Member;
  form: FormGroup;
  key: string;
  types = ['teacher', 'student'];
  teachers: Member[];
  successMessage: string;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  imageUrl;
  constructor(private router: Router, private toastr: ToastrService,
    private memberService: MemberService,private loginService:LoginService,
    private dialogRef: MatDialogRef<MemberFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit(): void {
    this.findAllTeacher();
    if (!!this.data) {
      this.currentItemId = this.data.memberId;

    }
    if (!!this.currentItemId) {
      this.key = "Update  Member",
        this.successMessage = "Member updated successfully"

      this.memberService.getMemberById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item);
      });
    } else {
      this.key = "Add New  Member";
      this.successMessage = "Member added successfully"

      this.initForm(null);
    }
  }
  initForm(member: Member): void {
    this.form = new FormGroup({
      cin: new FormControl(!!member ? member.cin : null, [Validators.required]),
      name: new FormControl(!!member ? member.name : null, []),
      email: new FormControl(!!member ? member.email : null, []),
      cv: new FormControl(!!member ? member.cv : null, []),
      birthDate: new FormControl(!!member ? member.birthDate : null, []),
      type: new FormControl(!!member ? member.type : null, []),
      diplome: new FormControl(!!member ? member.diplome : null, [Validators.required]),
      dateInscription: new FormControl(!!member ? member.dateInscription : null, []),
      grade: new FormControl(!!member ? member.grade : null, []),
      etablissement: new FormControl(!!member ? member.etablissement : null, []),
      teacher: new FormControl(!!member ? member.teacher : null, []),
      image: new FormControl(null),
      username:new FormControl(!!member ? member.username : null, []),
      password:new FormControl(!!member ? member.password : null, []),




    });
  }

  onSubmit(): void {
   console.log(this.form.controls.image.value);
    // console.log(this.form.controls.type.value)
    const objectToSubmit = { ...this.item, ...this.form.value };
    console.log(objectToSubmit);
    console.log(objectToSubmit.type)
    this.loginService.register(objectToSubmit).subscribe(
      data => {
        console.log("***"+data);
    
      },
      err => {
      
      }
    );
    if (this.form.controls.type.value == "teacher") {
      this.memberService.saveTeacher(objectToSubmit).then(() => {
        this.initForm(null);
        this.dialogRef.close();
        this.toastr.success(this.successMessage);

        this.router.navigate(['./dashboard/members'])
      }
      );
    }
    else if (this.form.controls.type.value == "student") {
      this.memberService.saveStudent(objectToSubmit).then(() => {
        this.initForm(null);
        this.dialogRef.close();
        this.toastr.success(this.successMessage);
        this.router.navigate(['./dashboard/members'])

      }
      );
     
    }


  }
  findAllTeacher() {
    return this.memberService.findAllTeacher().then(result => this.teachers = result);
  }
 

}
