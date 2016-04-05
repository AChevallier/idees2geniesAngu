System.register(['angular2/core', './demo.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, demo_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (demo_service_1_1) {
                demo_service_1 = demo_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_demoService) {
                    this._demoService = _demoService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.getFoods();
                };
                AppComponent.prototype.getFoods = function () {
                    var _this = this;
                    this._demoService.getFoods().subscribe(
                    // the first argument is a function which runs on success
                    function (data) { _this.foods = data; }, 
                    // the second argument is a function which runs on error
                    function (err) { return console.error(err); }, 
                    // the third argument is a function which runs on completion
                    function () { return console.log('done loading foods'); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>1st API <br/></h1><h2>Foods</h2>\n\t\t\t  <ul>\n\t\t\t    <li *ngFor=\"#food of foods\">{{food.name}}</li>\n\t\t\t  </ul>"
                    }), 
                    __metadata('design:paramtypes', [demo_service_1.DemoService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map