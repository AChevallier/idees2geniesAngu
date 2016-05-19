import {Component, Injector, DynamicComponentLoader} from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {AppComponent} from './app.component';

@Component({
    selector: 'login',
    templateUrl: 'template/login.html'
})
export class LoginComponent {

 
  public receiveName;

  login: string;
  password: string;

  tokenValidate: boolean;

  randomQuote: string;
  secretQuote: string;

  public dcl;
  public injector;

  constructor(dcl: DynamicComponentLoader, injector: Injector, private http:Http) {
    this.dcl = dcl;
    this.injector = injector;
  }

  ngOnInit() {
    this.postToken()
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  saveToken(token) {
    if(token) {
      localStorage.setItem('token', token)
    }
  }

  authenticate(login, password) {

    let creds = JSON.stringify({ login: login.value, password: password.value });

    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.post(AppSettings.API_ENDPOINT + 'user/login', creds, {
      headers: headers
    }).map(res => res.json())
      .subscribe(
          data => {
            this.saveToken(JSON.parse(data).token);
            login.value = null;
            password.value = null;
          },
          err => this.logError(err.json().message),
          () => console.log('Authentication Complete')
      );
  }


  postToken() {

    let token = localStorage.getItem('token');

    let creds = JSON.stringify({ token : token});

    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.post(AppSettings.API_ENDPOINT + 'user/isValideToken', creds, {
      headers: headers
    }).map(res => res.json())
        .subscribe(
            data => {
              this.tokenValidate = (JSON.parse(data).valide);

              if(this.tokenValidate === true){
                  this.dcl.loadAsRoot(AppComponent, 'my-app', this.injector);
              }
            },
            err => this.logError(err.json().message),
            () => console.log('Authentication Complete')
        );
  }

}
