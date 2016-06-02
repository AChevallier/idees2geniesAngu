/**
 * Created by Steve on 25/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router, CanActivate} from 'angular2/router';
import {DatePipe} from "angular2/common";
import {ElementRef} from "angular2/core";
import {RouteParams} from "angular2/router";
import {isLoggedIn} from "./login.service";

@Component({
    templateUrl: 'template/communautes.html'
})

@CanActivate(isLoggedIn)
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
                    this.getAllCommunities();
                },
                err => err.json().message,
                () => console.log('Authentication Complete')
            );
    }

    afficher_masquer_bloc(id){
        var bloc_ajouter = document.getElementById(id);
        var etat_bloc_ajouter = bloc_ajouter.style.display;

        if(etat_bloc_ajouter === 'block'){
            bloc_ajouter.style.display = "none";
        }
        else{
            bloc_ajouter.style.display = "block";
        }
    }

    communityPage(id){
        if(id != ""){
            this.router.navigate(['Communaute', { id: id }]);
        }
    }

    //post community | args : name, description
    postCommunity(name, description) {
        if(name != "" && description != "") {

            let creds = JSON.stringify({name: name.value, description: description.value});

            let headers = new Headers();
            headers.append('token', localStorage.getItem('token'));

            //headers.append('Content-Type', 'application/json');

            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            this.http.post(AppSettings.API_ENDPOINT + 'community/add', creds, {
                    headers: headers
                })
                .map(res => res.json())
                .subscribe(
                    data => {
                        name.value = null;
                        description.value = null;
                        this.getAllCommunities();
                        console.log('add comment done');
                    },
                    err => console.log('Erreur')
                );
        }
    }
}
