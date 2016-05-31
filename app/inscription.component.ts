/**
 * Created by grimo on 31/05/2016.
 */

import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {DatePipe} from "angular2/common";
import {ElementRef} from "angular2/core";
import {RouteParams} from "angular2/router";
import {LoginService, isLoggedIn} from "./login.service";
import {CanActivate} from "angular2/router";
import {OnInit} from "angular2/core";

@Component({
    templateUrl: 'template/inscription.html',
})
export class Inscription implements OnInit {

    ngOnInit() {

    }



}
