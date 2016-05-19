import {Component} from 'angular2/core';

import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {AppSettings} from './app.settings';

@Component({
    selector: 'my-app',
    templateUrl: 'template/my-app.html'
})
export class AppComponent {
 
  public foods;
  public time;
  username: string;
  password: string;
 
  public receiveName;
  constructor(private http:Http) { 
    
  }

  ngOnInit() { 
    this.getFoods();
    this.getTime(); 
  }
  logError(err) {
    console.error('There was an error: ' + err);
  }

  getFoods() {
    this.http.get('/app/food.json').map((res: Response) => res.json()).subscribe(
      // the first argument is a function which runs on success
      data => { this.foods = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }

  getTime() {
    this.http.get(AppSettings.API_ENDPOINT + 'ping').map(res => res.json()).subscribe(
      // the first argument is a function which runs on success
    data => { this.time = JSON.parse(data) },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading time' + JSON.stringify(this.time))
    );
  }

  authenticate(name) {

    let creds = JSON.stringify({ name: name.value });

    let headers = new Headers();
    //headers.append('Content-Type', 'application/json');

    headers.append('Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8');

    this.http.post(AppSettings.API_ENDPOINT + 'ping/post', creds, {
      headers: headers
      })
        .map(res => res.json())
      .subscribe(
        data => {
          this.receiveName = JSON.parse(data);
        },
        err => this.logError(err.json().message),
        () => console.log('Authentication Complete')
      );
  }
}
