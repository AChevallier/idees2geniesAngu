/**
 * Created by Steve on 25/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';

@Component({
    templateUrl: 'template/ajouter-idee.html'
})


export class AjouterIdeeComponent{
    constructor(private router: Router,private http:Http) {
    }

    ngOnInit() {

    }



}
