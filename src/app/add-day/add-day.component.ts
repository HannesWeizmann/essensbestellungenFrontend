import { Component } from '@angular/core';
import {Day} from 'src/app/dataclass/day';
import { Gericht } from '../dataclass/gericht';

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.scss']
})
export class AddDayComponent {

    defaultDate: Date =  new Date("2002-08-09");
    defaultGericht: Gericht = new Gericht("",0,0);
    newDay: Day = new Day(this.defaultDate, this.defaultGericht, this.defaultGericht,this.defaultGericht,this.defaultGericht)

}
