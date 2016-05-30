/**
 * Created by Steve on 25/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {DatePipe} from "angular2/common";
import {ElementRef} from "angular2/core";
import {RouteParams} from "angular2/router";

@Component({
    templateUrl: 'template/communautes.html'
})


export class CommunautesComponent{

    public Communities;

    constructor(private router: Router,private http:Http) {

    }

    ngOnInit() {
        this.getAllCommunities();
    }

    getAllCommunities(){
        let creds = '';

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'community', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.Communities = JSON.parse(data);
                },
                err => err.json().message,
                () => console.log('Communities NOK')
            );
    }

    join(id){
        let creds = JSON.stringify({id: id});

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'community/join', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    console.log(JSON.parse(data));
                    this.getAllCommunities();
                },
                err => err.json().message,
                () => console.log('Authentication Complete')
            );
    }
}
