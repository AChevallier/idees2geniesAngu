/**
 * Created by alexandre on 28/05/16.
 */
import {Injectable} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';

//call md5.js
declare var md5:any;

@Injectable()
export class LoginService {


    login:string;
    tokenValidate = false;

    constructor(private http:Http) {
        this.postToken();
    }

    
    authenticate(login, password) {
        let creds = JSON.stringify({login: login.value, password: md5(password.value)});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.post(AppSettings.API_ENDPOINT + 'user/login', creds, {
            headers: headers
        }).map(res => res.json())
        .map((res) => {
            var dataParsed = JSON.parse(res);
            if (dataParsed.token) {
                localStorage.setItem('token', dataParsed.token)
                this.tokenValidate = true;
                localStorage.setItem('last_name', dataParsed.name);
                localStorage.setItem('first_name', dataParsed.firstName);
                login.value = null;
                password.value = null;
                return true;
            }

            return false;
        });
    }

    postToken() {

        let token = !!localStorage.getItem('token') ? localStorage.getItem('token') : '';

        let creds = JSON.stringify({token: token});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        return this.http.post(AppSettings.API_ENDPOINT + 'user/isValideToken', creds, {
            headers: headers
        }).map(res => res.json())
            .map((res) => {
                console.log(res);
                var dataParsed = JSON.parse(res);
                if (dataParsed.valide) {
                    this.tokenValidate = (dataParsed.valide);
                }
                return dataParsed;
            });
    }

}

export function isLoggedIn() {
    return !!localStorage.getItem('token');
}