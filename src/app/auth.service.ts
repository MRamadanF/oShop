import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, of } from '../../node_modules/rxjs';
import { ActivatedRoute, Router } from '../../node_modules/@angular/router';
import { AppUser } from './models/app-user';
import { switchMap } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(private userService: UserService, 
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router) {
    this.user$ = afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$():Observable<AppUser>{
    return this.user$.pipe(
      switchMap(user=>{
          if(user) {
            return this.userService.get(user.uid);
          }
          return of(null);
        }
      ));
  }
}
