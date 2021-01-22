import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { FormControlName, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  loginForm: FormGroup;

  user:User;
  constructor(private loginService:LoginService,private router: Router ) { }

  ngOnInit(): void {
    this. loginForm = new FormGroup({
      username: new FormControl( null, [Validators.required ]),
      password: new FormControl( null,[Validators.required ]),
    
    });
    
  }
  login()
  {
    this.user = this.loginForm.value;
    console.log(this.user);
    this.loginService.login(this.user)
    .subscribe(data =>
      {//console.log(data);
        let jwt = data.headers.get('Authorization');
      console.log(jwt)
       // this.ngOnInit
        this.loginService.saveJwt(jwt);
      //  console.log(jwt);
        this.router.navigate(['/dashboard']);
      }, err=>{
      //  console.log(err);
      }
      );
  }

}
