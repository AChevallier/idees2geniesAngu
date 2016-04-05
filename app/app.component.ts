import {Component} from 'angular2/core';
import {DemoService} from './demo.service';

@Component({
    selector: 'my-app',
    template: `<h1>1st API <br/></h1><h2>Foods</h2>
			  <ul>
			    <li *ngFor="#food of foods">{{food.name}}</li>
			  </ul>`
})
export class AppComponent {
 
  public foods;

 
  constructor(private _demoService: DemoService) { }
 
 ngOnInit() {
    this.getFoods();
  }

  getFoods() {
    this._demoService.getFoods().subscribe(
      // the first argument is a function which runs on success
      data => { this.foods = data},
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading foods')
    );
  }
}
