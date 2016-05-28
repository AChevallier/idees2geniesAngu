/**
 * Created by alexandre on 21/05/16.
 */
import {Component} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';
import {Router} from 'angular2/router';

@Component({
    selector:'information',
    templateUrl: 'template/information.html'
})
export class InformationComponent{

    public resultAddIdea;
    public boolAddIdea;


    constructor(private router: Router,private http:Http) {
    }

    ngOnInit() {

        this.getTime();
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }

    postIdea(title, idea){

        let creds = JSON.stringify({title: title.value, idea:idea.value });

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
                    let parsedData = JSON.parse(data);
                    if(parsedData.error){
                        this.resultAddIdea = 'Erreur';
                        this.boolAddIdea = false;
                    }
                    else{
                        this.resultAddIdea = 'C\'est fait';
                        this.boolAddIdea = true;
                    }
                },
                err => {
                    this.resultAddIdea = 'Erreur';
                    this.boolAddIdea = false;
                },
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
