import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router, CanActivate} from 'angular2/router';
import {Json} from "angular2/src/facade/lang";
import {isLoggedIn} from "./login.service";

@Component({
    templateUrl: 'template/idees.html'
})

@CanActivate(isLoggedIn)
export class IdeesComponent{

    public ideasJson = [];
    public myCommunities;

    constructor(private router: Router,private http:Http) {
    }
    public dataParsed = [];

    ngOnInit() {
        this.getIdeasPosted();
        this.getMyCommunities();
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

    postIdea(title, community, idea){

        console.log(title);
        console.log(idea);

            let creds = JSON.stringify({title: title.value, idCommunity:community.value ,idea:idea.value });

            let headers = new Headers();
            headers.append('token', localStorage.getItem('token'));

            //headers.append('Content-Type', 'application/json');

            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            this.http.post(AppSettings.API_ENDPOINT + 'idea/add', creds, {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => {
                        this.getIdeasPosted();
                        console.log(data)
                        //this.receiveName = JSON.parse(data);
                    },
                    err => this.logError(err.json().message),
                    () => console.log('sent idea')
                );
    }

    afficher_masquer_bloc_ajouter(id){
        var bloc_ajouter = document.getElementById(id);
        var etat_bloc_ajouter = bloc_ajouter.style.display;

        if(etat_bloc_ajouter === 'block'){
            bloc_ajouter.style.display = "none";
        }
        else{
            bloc_ajouter.style.display = "block";
        }
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

}