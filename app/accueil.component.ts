/**
 * Created by alexandre on 21/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {DatePipe} from "angular2/common";

@Component({
    selector:'information',
    templateUrl: 'template/accueil.html'
})


export class AccueilComponent{

    public receiveName;
    public top5ideas;
    public myCommunities;


    constructor(private router: Router,private http:Http) {
    }

    ngOnInit() {

        this.getTime();
        this.getMyCommunities();
        this.getTop5Ideas();
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

    getMyCommunities(){
        let creds = '';

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        //headers.append('Content-Type', 'application/json');

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'community/myCommunities', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.myCommunities = JSON.parse(data);
                },
                err => this.logError(err.json().message),
                () => console.log('sent idea')
            );
    }

    getTop5Ideas(){
        let creds = '';

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'idea/top5', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.top5ideas = JSON.parse(data);
                },
                err => this.logError(err.json().message),
                () => console.log('sent idea')
            );
    }

    getTime(){
        this.http.get(AppSettings.API_ENDPOINT + 'ping').map(res => res.json()).subscribe(
            // the first argument is a function which runs on success
            data => {
                //this.time = JSON.parse(data)
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading time')
        );
    }
}
