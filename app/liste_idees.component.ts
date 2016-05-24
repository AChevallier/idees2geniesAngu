import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';
import {Json} from "angular2/src/facade/lang";

@Component({
    templateUrl: 'template/liste.html'
})
export class ListeIdeesComponent{

    public ideasJson = [];

    constructor(private router: Router,private http:Http) {
    }
    public dataParsed = [];

    ngOnInit() {
        this.getIdeasPosted();
    }


    getIdeasPosted() {

        let creds = '';

        let headers = new Headers();

        headers.append('token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'idea', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    this.dataParsed = JSON.parse(data);
                },
                err => err.json().message,
                () => console.log('Authentication Complete')
            );
    }

    vote(id){

        let creds = JSON.stringify({id: id});

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'idea/vote', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    console.log(JSON.parse(data));
                    this.getIdeasPosted();
                },
                err => err.json().message,
                () => console.log('Authentication Complete')
            );



    }
}
