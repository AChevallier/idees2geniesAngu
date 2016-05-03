import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import {AppSettings} from './app.settings';
 
@Injectable()
export class DemoService {
 
  constructor(private http:Http) { }
 
  // Uses http.get() to load a single JSON file
  getFoods() {
    return this.http.get('/app/food.json').map((res:Response) => res.json());
  }
 
  getTime() {
	  return this.http.get(AppSettings.API_ENDPOINT+'Ping/').map((res: Response) => res.json());
  }
}