import { Component, OnInit } from '@angular/core';
import {Auth} from 'src/app/guards/auth';


@Component({
  selector: 'app-speiseplan',
  templateUrl: './speiseplan.component.html',
  styleUrls: ['./speiseplan.component.scss']
})
export class SpeiseplanComponent implements OnInit {
  private auth: Auth = new Auth();
  public username = "";


  ngOnInit(): void {

    this.username = this.auth.getUsername();

  }

}
