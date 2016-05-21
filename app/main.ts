/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
import {ROUTER_PROVIDERS,APP_BASE_HREF,LocationStrategy,RouteParams,ROUTER_BINDINGS, HashLocationStrategy} from 'angular2/router';
import {bind, provide} from 'angular2/core';
import {AppComponent} from "./app.component";


bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass:HashLocationStrategy})
    //bind(APP_BASE_HREF).toValue(location.pathname)
]);