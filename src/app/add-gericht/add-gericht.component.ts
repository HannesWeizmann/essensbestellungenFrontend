import { Component, OnInit } from '@angular/core';
import {Kategorie} from './Kategorie';

@Component({
  selector: 'app-add-gericht',
  templateUrl: './add-gericht.component.html',
  styleUrls: ['./add-gericht.component.scss']
})

export class AddGerichtComponent{

    newGericht: {name: string, preis: number, kategorie: Kategorie } = {name:"", preis:0.0, kategorie:0};

    


 

}
