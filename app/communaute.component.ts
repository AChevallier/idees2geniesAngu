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
    templateUrl: 'template/communaute.html'
})


export class CommunauteComponent{

    public idCommunity;
    public community;
    public nameCommunity;
    public descriptionCommunity;
    public ideasCommunity;
    public usersCommunity;

    constructor(private router: Router,private http:Http, params: RouteParams) {

        this.idCommunity = params.get('id');
        this.getCommunity();
        this.getIdeasCommunity();
        this.getUsersCommunity();
    }

    ngOnInit() {

    }

    getCommunity(){

        let creds = JSON.stringify({id: this.idCommunity});

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'community/getCommunity', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.community = JSON.parse(data);

                    this.nameCommunity = this.community.name;
                    this.descriptionCommunity = this.community.description;

                },
                err => err.json().message,
                () => console.log('Community NOK')
            );
    }

    getIdeasCommunity(){
        let creds = JSON.stringify({id: this.idCommunity});

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'idea/ideasCommunity', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.ideasCommunity = JSON.parse(data);
                },
                err => () => console.log('Erreur')
            );
    }

    getUsersCommunity(){
        let creds = JSON.stringify({id: this.idCommunity});

        let headers = new Headers();
        headers.append('token', localStorage.getItem('token'));

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'user/usersCommunity', creds, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => {
                    console.log(data)
                    this.usersCommunity = JSON.parse(data);
                },
                err => () => console.log('Erreur')
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
                    this.getIdeasCommunity();
                },
                err => err.json().message,
                () => console.log('Authentication Complete')
            );



    }
}
