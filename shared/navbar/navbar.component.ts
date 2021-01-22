import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Input() icone;
  username:string="";

  constructor( private router: Router,private loginService:LoginService) { }

  ngOnInit(): void {
   
    }
    logout()
    {
      this.loginService.logout();
    }
    isAuthenticated()
  {
    this.username = this.loginService.getUserName();
    return this.loginService.isAuthenticated();
  }

  }

 
