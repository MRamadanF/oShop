import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth:AuthService, router: Router, userServcie: UserService) {
    auth.user$.subscribe(user => {
      if(user){
        userServcie.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
