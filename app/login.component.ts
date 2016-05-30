import {Component, OnInit} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {LoginService} from './login.service';

//call md5.js
declare var md5:any;

@Component({
    selector:'information',
    templateUrl: 'template/login.html',
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    public receiveName;

    login:string;
    tokenValidate = false;


    constructor(private loginService: LoginService, private router: Router, private http : Http) {
    }

    ngOnInit() {
        this.onPostToken();
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

    onAuthenticate(login, password) {

        this.loginService.authenticate(login, password).subscribe((result) => {
            if (result) {
                this.router.navigate(['Accueil']);
            }else{
                this.router.navigate(['Login']);
            }
        });
    }

    onPostToken() {

        this.loginService.postToken().subscribe((result) => {
            console.log('to');
            if (result.valide) {
                console.log('done');
                this.router.navigate(['Accueil']);
            }else{
                this.router.navigate(['Login']);
            }
        });
    }

}
