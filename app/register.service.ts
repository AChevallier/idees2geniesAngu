/**
 * Created by grimo on 01/06/2016.
 */
import {Injectable} from 'angular2/core';

import {Http, Headers} from 'angular2/http';
import {AppSettings} from './app.settings';

//call md5.js
declare var md5:any;

@Injectable()
export class RegisterService {
    tokenValidate = false;
    constructor(private http:Http) {

    }

    insert(firstName, name, login, password) {
        let creds = JSON.stringify({name: name.value, firstName: firstName.value,  password: md5(password.value), email: login.value, administrator : false});

        let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let [retu] = new Array();
        return this.http.post(AppSettings.API_ENDPOINT + 'user/add', creds, {
            headers: headers
        }).map(res => res.json())
            .map((res) => {
                var obj = JSON.parse(res);
                if(obj.error != null){
                    var messageString =  obj.error.message.toString();
                    return [false, messageString];
                }
                else{
                    return [true];
                }
            });
    }
}