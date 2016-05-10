/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {AppComponent} from './app.component';
import {AppSettings} from './app.settings';

bootstrap(AppComponent, [
  HTTP_PROVIDERS
]);