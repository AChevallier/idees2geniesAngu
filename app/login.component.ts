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
        this.postToken();
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
                    let dataParsed = JSON.parse(data);
                    this.saveToken(dataParsed.token);
                    localStorage.setItem('last_name', dataParsed.name);
                    localStorage.setItem('first_name', dataParsed.firstName);
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

    postToken() {
        let token = localStorage.getItem('token');

        let creds = JSON.stringify({token: token});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'user/isValideToken', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    this.tokenValidate = (JSON.parse(data).valide);

                    if (this.tokenValidate === true) {
                        this.router.navigate(['Information']);
                    }
                },
                err => console.error('There was an error: ' + err.json().message),
                () => console.log('Checking token done')
            );
    }

}
