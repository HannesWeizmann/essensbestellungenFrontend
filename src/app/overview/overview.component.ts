import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../shared/http-client.service';
import { firstValueFrom, Observable , map} from 'rxjs';
import {Overview} from 'src/app/dataclass/overview';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
    constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router){}

    overviews: Overview[] = [];
    detailVisible: Boolean = false;
    overview!: Overview;


    ngOnInit(){
      this.getOverviews();
    }

    async navigateBack(){
      this.router.navigate(['/adminportal'])
    }

    async getOverviews(){
      try {
        this.overviews = await firstValueFrom(this.http.get<Overview[]>("/bestellung/overview",{ withCredentials: true} ));
        let transfer: Date |undefined;
        this.overviews.forEach(element => {
          transfer = new Date(element.date);
          element.date = transfer;
        });
        this.overviews.sort((a,b)=> a.date.getTime() - b.date.getTime());
      } catch (error) {
        alert((error as Error).message);
      }
    }

    showDetail(date :Date){
        this.overviews.forEach(element => {
          if(element.date.toLocaleDateString() == date.toLocaleDateString()){
            this.overview = element;
          }
        });
        this.detailVisible =true;
    }

  

}
