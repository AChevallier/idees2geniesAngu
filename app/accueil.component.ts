/**
 * Created by alexandre on 21/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router, CanActivate} from 'angular2/router';
import {DatePipe} from "angular2/common";
import {LoginService, isLoggedIn} from "./login.service";


@Component({
    selector:'information',
    templateUrl: 'template/accueil.html',
    providers: [LoginService]
})

@CanActivate(isLoggedIn)
export class AccueilComponent{

    public receiveName;
    public top5ideas;
    public myCommunities;

    public id;

    public name;

    constructor(private loginService : LoginService, private router: Router,private http:Http) {

    }

    ngOnInit() {
        this.onPostToken();
        this.getTime();
        this.getMyCommunities();
        this.getTop5Ideas();
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

    onPostToken() {
        this.loginService.postToken().subscribe((result) => {
            if (result.valide) {
                this.name = result.firstName + " " + result.name;
            }else{
                this.router.navigate(['Login']);
            }
        });
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

    communityPage(id){
        if(id != ""){
            this.router.navigate(['Communaute', { id: id }]);
        }
    }
}
