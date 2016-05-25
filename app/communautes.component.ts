/**
 * Created by Steve on 25/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {DatePipe} from "angular2/common";

@Component({
    templateUrl: 'template/communautes.html'
})


export class CommunautesComponent{

    public theHtmlString;

    constructor(private router: Router,private http:Http) {


    }

    ngOnInit() {

    }



}
