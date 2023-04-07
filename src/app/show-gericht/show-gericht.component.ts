import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Gericht} from 'src/app/dataclass/gericht';
import {catchError, from, map, Observable, of} from 'rxjs';
import { firstValueFrom } from 'rxjs';



interface GerichtHttpResponse{
  gerichte: Gericht[];
}

enum Kategorie{
  menu,
  nachtisch,
  suppe,
}

@Component({
  selector: 'app-show-gericht',
  templateUrl: './show-gericht.component.html',
  styleUrls: ['./show-gericht.component.scss']
})
export class ShowGerichtComponent {

  public gerichte: Observable<Gericht[]> |undefined;
  list = [{name: "philipp"}]
  errorMessage: string = "";
  

  constructor(private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.reload();
  }


  async reload(){
    try{
      //this.gerichte = this.http.get<Gericht[]>("/gericht").pipe(map((data: { gerichte: any; }) => data.gerichte));
      //const result = await firstValueFrom
      //this.gerichte = await firstValueFrom(this.http.get<Gericht[]>("http://localhost:3000/gericht",{ withCredentials: true}))
      this.gerichte= this.http.get<Gericht[]>("http://localhost:3000/gericht",{ withCredentials: true}).pipe(map(data=> data));
    }catch(error){
      this.errorMessage = (error as Error).message;    }
  }


  async delete(id: string |undefined){
    try {
      const result = await firstValueFrom(this.http.delete('http://localhost:3000/gericht'+ id,{ withCredentials: true}))
    } catch (error) {
      this.errorMessage = (error as Error).message;
    }
  }
}
