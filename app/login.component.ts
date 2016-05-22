import {Component, OnInit} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';

//call md5.js
declare var md5:any;

@Component({
    selector:'information',
    templateUrl: 'template/login.html'
})
export class LoginComponent implements OnInit {
    public receiveName;

    login:string;
    tokenValidate = false;


    constructor(private router: Router, private http:Http) {
    }

    ngOnInit() {
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

    saveToken(token) {
        if (token) {
            localStorage.setItem('token', token)
            this.tokenValidate = true;
        }
    }

    authenticate(login, password) {

        let creds = JSON.stringify({login: login.value, password: md5(password.value)});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'user/login', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    this.saveToken(JSON.parse(data).token);
                    login.value = null;
                    password.value = null;

                    if (this.tokenValidate === true) {
                        this.router.navigate(['Information']);
                    }
                },
                err => this.logError(err.json().message),
                () => console.log('Authentication Complete')
            );
    }

}
