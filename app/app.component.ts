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
import {LoginService} from "./login.service";

@Component({
    selector: 'my-app',
    templateUrl: 'template/my-app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [LoginService]
})
@RouteConfig([
    {path: '/login',name : 'Login' , component: LoginComponent},
    {path: '/accueil', name : 'Accueil', component: AccueilComponent},
    {path: '/idees',name : 'Idees' , component: IdeesComponent},
    {path: '/ajouter-idee',name : 'AjouterIdee' , component: AjouterIdeeComponent},
    {path: '/communautes',name : 'Communautes' , component: CommunautesComponent},
    {path: '/communaute/:id',name : 'Communaute' , component: CommunauteComponent},
    {path: '/inscription',name : 'Inscription' , component: InscriptionComponent},
])
export class AppComponent implements OnInit{

    tokenValidate:boolean;

    public name;
    constructor(private loginService: LoginService, private router: Router, private http: Http) {
    }

    ngOnInit() {
        this.onPostToken()
        this.name = localStorage.getItem('first_name') + " " + localStorage.getItem('last_name');
    }

    onPostToken() {

        this.loginService.postToken().subscribe((result) => {
            if (result.valide) {
                this.router.navigate(['Accueil']);
            }else{
                this.router.navigate(['Login']);
            }
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['Login']);
    }
}
