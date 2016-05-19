import {Component, OnDestroy, OnInit, Injector, DynamicComponentLoader} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';

@Component({
    selector: 'my-app',
    templateUrl: 'template/my-app.html'
})
export class AppComponent{

    public time;
    username:string;
    password:string;

    public receiveName;

    public dcl;
    public injector;

    constructor(dcl:DynamicComponentLoader, injector:Injector,private http:Http) {
        this.dcl = dcl;
        this.injector = injector;
    }

    ngOnInit() {
        this.getTime();
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

    getTime() {
        this.http.get(AppSettings.API_ENDPOINT + 'ping').map(res => res.json()).subscribe(
            // the first argument is a function which runs on success
            data => {
                this.time = JSON.parse(data)
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading time' + JSON.stringify(this.time))
        );
    }

    postName(name) {

        let creds = JSON.stringify({name: name.value});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');

        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        this.http.post(AppSettings.API_ENDPOINT + 'ping/post', creds, {
            headers: headers
        })
            .map(res => res.json())
            .subscribe(
                data => {
                    this.receiveName = JSON.parse(data);
                },
                err => this.logError(err.json().message),
                () => console.log('sent name')
            );
    }


    logout() {
        localStorage.removeItem('token');
        //reload page NOT GOOD to change with the time
        location.reload();
    }
}
