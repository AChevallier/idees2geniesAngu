import {Component, OnInit} from 'angular2/core';
import {LoginComponent} from './login.component';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {Headers, Http} from "angular2/http";
import {AppSettings} from "./app.settings";
import {IdeesComponent} from "./idees.component";
import {CommunautesComponent} from "./communautes.component";
import {AjouterIdeeComponent} from "./ajouter-idee.component";
import {AccueilComponent} from "./accueil.component";
import {CommunauteComponent} from "./communaute.component";

@Component({
    selector: 'my-app',
    templateUrl: 'template/my-app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/login',name : 'Login' , component: LoginComponent},
    {path: '/accueil', name : 'Accueil', component: AccueilComponent},
    {path: '/idees',name : 'Idees' , component: IdeesComponent},
    {path: '/ajouter-idee',name : 'AjouterIdee' , component: AjouterIdeeComponent},
    {path: '/communautes',name : 'Communautes' , component: CommunautesComponent},
    {path: '/communaute/:id',name : 'Communaute' , component: CommunauteComponent},
])
export class AppComponent implements OnInit{

    tokenValidate:boolean;

    public name;
    constructor(private router: Router, private http: Http) {
    }

    ngOnInit() {
        this.postToken()
        this.name = localStorage.getItem('first_name') + " " + localStorage.getItem('last_name');
    }

    postToken() {
        let token = localStorage.getItem('token');

        let creds = JSON.stringify({token: token});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'user/isValideToken', creds, {
            headers: headers
        }).map(res => res.json())
            .subscribe(
                data => {
                    this.tokenValidate = (JSON.parse(data).valide);

                    if (this.tokenValidate === true) {
                        this.router.navigate(['Accueil']);
                    }
                    else{
                        this.router.navigate(['Login']);
                    }
                },
                err => console.error('There was an error: ' + err.json().message),
                () => console.log('Checking token done')
            );
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['Login']);
    }
}
