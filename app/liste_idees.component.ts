import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';

@Component({
    templateUrl: 'template/liste.html'
})
export class ListeIdeesComponent{


    constructor(private router: Router,private http:Http) {
    }

    ngOnInit() {

    }
}
