import {Component} from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';

@Component({
    selector: 'login',
    templateUrl: 'template/login.html'
})
export class LoginComponent {

 
  public receiveName;

  username: string;
  password: string;

  randomQuote: string;

  constructor(private http:Http) { 
    
  }

  ngOnInit() {
  }

  logError(err) {
    console.error('There was an error: ' + err);
  }

  saveJwt(jwt) {
    if(jwt) {
      localStorage.setItem('token', jwt)
    }
  }

  authenticate(username, password) {

    let creds = JSON.stringify({ username: username.value, password: password.value });

    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    headers.append('Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.post(AppSettings.API_ENDPOINT + 'user/login', creds, {
      headers: headers
    }).map(res => res.json())
      .subscribe(
          data => {
            this.saveJwt(JSON.parse(data).token);
            username.value = null;
            password.value = null;
          },
          err => this.logError(err.json().message),
          () => console.log('Authentication Complete')
      );
  }


  getSecretQuote() {

    let jwt = localStorage.getItem('id_token');
    let authHeader = new Headers();
    if(jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }

    this.http.get('http://localhost:3001/api/protected/random-quote', {
      headers: authHeader
    })
        .subscribe(
            data => this.secretQuote = data.text(),
            err => this.logError(err.text()),
            () => console.log('Secret Quote Complete')
        );

  }

}
