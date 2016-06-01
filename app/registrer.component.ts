/**
 * Created by grimo on 31/05/2016.
 */
import {Component, OnInit} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {LoginService} from './login.service';
import {RegisterService} from "./register.service";

//call md5.js
declare var md5:any;

@Component({
    selector:'information',
    templateUrl: 'template/register.html',
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

    constructor(private registerService: RegisterService, private loginservice : LoginService, private router: Router) {

    }

    ngOnInit() {

    }

    onInscription(firstName, name, login, password){
        this.registerService.insert(firstName, name, login, password).subscribe((result) => {
            if (result[0]) {
               this.loginservice.authenticate(login, password).subscribe((result) => {

                   if (result) {
                       this.router.navigate(['Accueil']);
                   } else {
                       this.router.navigate(['Register']);
                   }
               });
            } else {
                //this.router.navigate(['Register']);
                alert(result[1]);
            }
        });
    }


}