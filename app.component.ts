import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(private loginService:LoginService)
  {

  }
  ngOnInit():void
  {
  this.loginService.loadJWT();
  }
}
