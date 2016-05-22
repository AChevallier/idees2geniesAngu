import {Component, OnInit, Injector, DynamicComponentLoader} from 'angular2/core';
import {LoginComponent} from './login.component';
import {InformationComponent} from './information.component';
import {ROUTER_DIRECTIVES, RouteConfig, Router, AuxRoute} from 'angular2/router';
import {Headers, Http} from "angular2/http";
import {AppSettings} from "./app.settings";
import {ListeIdeesComponent} from "./liste_idees.component";

@Component({
    selector: 'my-app',
    templateUrl: 'template/my-app.html',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/login',name : 'Login' , component: LoginComponent},
    {path: '/information', name : 'Information', component: InformationComponent},
    {path: '/liste',name : 'Liste' , component: ListeIdeesComponent},
])
export class AppComponent implements OnInit{

    tokenValidate:boolean;

    public name;
    constructor(private router: Router, private http: Http) {
    }

    ngOnInit() {
        this.name = localStorage.getItem('last_name') + " " + localStorage.getItem('first_name');
        this.postToken()
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
                        this.router.navigate(['Information']);
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
