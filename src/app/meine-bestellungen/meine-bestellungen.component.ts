import { Component, OnInit } from '@angular/core';
import { AppHttpClient } from '../shared/http-client.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import {Bestellung} from 'src/app/dataclass/bestellung';
import { Auth } from '../guards/auth';
import { firstValueFrom, Observable , map} from 'rxjs';

import jsPDF from 'jspdf';


@Component({
  selector: 'app-meine-bestellungen',
  templateUrl: './meine-bestellungen.component.html',
  styleUrls: ['./meine-bestellungen.component.scss']
})
export class MeineBestellungenComponent implements OnInit{

  defaultdate = new Date();
  auth: Auth = new Auth();
  username = "";
  myBestellungen: Bestellung[] = [];
  defaultBestellung: Bestellung = new Bestellung(this.defaultdate, "", false, 0);
  bestellung: Bestellung = this.defaultBestellung;
  detailsVisible: Boolean = false; 
  hasMenu1: Boolean = false; 
  hasMenu2: Boolean = false;
  hasNachtisch: Boolean = false; 
  hasSuppe: Boolean = false;
  isVegetarisch ="Nein";  

  constructor(
      private readonly http: AppHttpClient,
      private readonly router: Router,
      private readonly authService: AuthService,
  ) {}

  ngOnInit(): void{
    this.username = this.auth.getUsername();
    this.getMyBestellungen();
  }

  async navigateBack(){
      this.router.navigate(['/speiseplan'])
  }

  async getMyBestellungen(){
    try {
      this.myBestellungen = await firstValueFrom(this.http.get('/bestellung/' + this.username, { withCredentials: true}));
      let transfer: Date | undefined;
      this.myBestellungen.forEach(element => {
        transfer = new Date(element.date);
        element.date = transfer;
      });      
      this.myBestellungen.sort((a,b)=> a.date.getTime() - b.date.getTime());

    } catch (error) {
      alert((error as Error).message);
    }
  }

  showDetails(_id: string | undefined){
    this.myBestellungen.forEach(element => {
      if(element._id == _id){
        this.bestellung = element;
      }
    });

    if(!this.bestellung.menu1 == false){
      this.hasMenu1 = true;
      this.hasMenu2 = false;
    }
    else{
      this.hasMenu2 = true;
      this.hasMenu1 = false;
    }
    if(!this.bestellung.nachtisch ==false){
      this.hasNachtisch =true;
    }else{
      this.hasNachtisch= false;
    }
    if(!this.bestellung.suppe ==false){
      this.hasSuppe =true;
    }else{
      this.hasSuppe=false;
    }
    if(this.bestellung.vegetarisch==true){
      this.isVegetarisch = "Ja";
    }
    else{
      this.isVegetarisch ="Nein";
    }

    this.detailsVisible = true;
  }

  async deleteBestellung(id: string|undefined){
    try {
      const result = await firstValueFrom(this.http.delete('/bestellung/' + id, { withCredentials: true}));
      this.getMyBestellungen();
      this.detailsVisible = false;
    } catch (error) {
      alert((error as Error).message)
    }
  }

  
  async generateWeeklyPDF() {
    // Bestellungen der Woche abrufen und zusammenfassen
    const currentDate = new Date();
    const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
    const weekEnd = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
  
    let bestellungen: Bestellung[] = [];
    try {
      bestellungen = await firstValueFrom(this.http.get('/bestellung/'+ this.username, { withCredentials: true }));
    } catch (error) {
      alert((error as Error).message);
      return;
    }

    const weeklyBestellungen = bestellungen.filter(b => {
      const date = new Date(b.date);
      return date >= weekStart && date <= weekEnd;
    });

    // PDF generieren
    const doc = new jsPDF();
    let yPos = 10;
    let page =1;
  
    doc.setFontSize(16);
    doc.text(`Wöchentliche Bestellungen_${weekStart.toLocaleDateString()}-${weekEnd.toLocaleDateString()}`, 10, yPos);
    yPos += 20;
  
    doc.setFontSize(12);
    weeklyBestellungen
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // sortiere nach Datum aufsteigend
    .forEach((b, i) => {
      const date = new Date(b.date);

      doc.text(`Bestellung vom ${date.toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      if (b.menu1 !== undefined) {
        doc.text(`Menü 1: ${b.menu1!.name} - ${b.menu1!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.menu2 !== undefined) {
        doc.text(`Menü 2: ${b.menu2!.name} - ${b.menu2!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.suppe !== undefined) {
        doc.text(`Suppe: ${b.suppe!.name} - ${b.suppe!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.nachtisch !== undefined) {
        doc.text(`Nachtisch: ${b.nachtisch!.name} - ${b.nachtisch!.preis} €`, 10, yPos);
        yPos += 10;
      }
  
      doc.text(`Vegetarisch: ${b.vegetarisch ? 'Ja' : 'Nein'}`, 10, yPos);
      yPos += 10;

      doc.text(`Gesamtpreis: ${b.kosten} €`, 10, yPos);
      yPos += 20;

     // Überprüfen, ob das Ende der Seite erreicht ist
     if (yPos > doc.internal.pageSize.height - 20 && i !== weeklyBestellungen.length - 1) {
      doc.addPage();
      yPos = 10;
      page++;
      doc.setFontSize(16);
      doc.text('Wöchentliche Bestellungen (Seite ' + page + ')', 10, yPos);
      yPos += 20;
      doc.setFontSize(12);
    }
    });
  
    doc.save(`bestellungen_${weekStart.toLocaleDateString()}_${weekEnd.toLocaleDateString()}.pdf`);
  }


  async generatenaechsteWochePDF() {
    // Bestellungen der Woche abrufen und zusammenfassen
    const currentDate = new Date();
    const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
    const weekEnd = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
  
    let bestellungen: Bestellung[] = [];
    try {
      bestellungen = await firstValueFrom(this.http.get('/bestellung/'+ this.username, { withCredentials: true }));
    } catch (error) {
      alert((error as Error).message);
      return;
    }

    const weeklyBestellungen = bestellungen.filter(b => {
      const date = new Date(b.date);
      return date >= weekStart && date <= weekEnd;
    });

    // PDF generieren
    const doc = new jsPDF();
    let yPos = 10;
    let page =1;
  
    doc.setFontSize(16);
    doc.text(`Wöchentliche Bestellungen_${weekStart.toLocaleDateString()}-${weekEnd.toLocaleDateString()}`, 10, yPos);
    yPos += 20;
  
    doc.setFontSize(12);
    weeklyBestellungen
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // sortiere nach Datum aufsteigend
    .forEach((b, i) => {
      const date = new Date(b.date);

      doc.text(`Bestellung vom ${date.toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      if (b.menu1 !== undefined) {
        doc.text(`Menü 1: ${b.menu1!.name} - ${b.menu1!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.menu2 !== undefined) {
        doc.text(`Menü 2: ${b.menu2!.name} - ${b.menu2!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.suppe !== undefined) {
        doc.text(`Suppe: ${b.suppe!.name} - ${b.suppe!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.nachtisch !== undefined) {
        doc.text(`Nachtisch: ${b.nachtisch!.name} - ${b.nachtisch!.preis} €`, 10, yPos);
        yPos += 10;
      }
  
      doc.text(`Vegetarisch: ${b.vegetarisch ? 'Ja' : 'Nein'}`, 10, yPos);
      yPos += 10;

      doc.text(`Gesamtpreis: ${b.kosten} €`, 10, yPos);
      yPos += 20;

     // Überprüfen, ob das Ende der Seite erreicht ist
     if (yPos > doc.internal.pageSize.height - 20 && i !== weeklyBestellungen.length - 1) {
      doc.addPage();
      yPos = 10;
      page++;
      doc.setFontSize(16);
      doc.text('Wöchentliche Bestellungen (Seite ' + page + ')', 10, yPos);
      yPos += 20;
      doc.setFontSize(12);
    }
    });
  
    doc.save(`bestellungen_${weekStart.toLocaleDateString()}_${weekEnd.toLocaleDateString()}.pdf`);
  }

  async generateuebernaechsteWochePDF() {
    // Bestellungen der Woche abrufen und zusammenfassen
    const currentDate = new Date();
    const weekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 14));
    const weekEnd = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7));
  
    let bestellungen: Bestellung[] = [];
    try {
      bestellungen = await firstValueFrom(this.http.get('/bestellung/'+ this.username, { withCredentials: true }));
    } catch (error) {
      alert((error as Error).message);
      return;
    }

    const weeklyBestellungen = bestellungen.filter(b => {
      const date = new Date(b.date);
      return date >= weekStart && date <= weekEnd;
    });

    // PDF generieren
    const doc = new jsPDF();
    let yPos = 10;
    let page =1;
  
    doc.setFontSize(16);
    doc.text(`Wöchentliche Bestellungen_${weekStart.toLocaleDateString()}-${weekEnd.toLocaleDateString()}`, 10, yPos);
    yPos += 20;
  
    doc.setFontSize(12);
    weeklyBestellungen
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // sortiere nach Datum aufsteigend
    .forEach((b, i) => {
      const date = new Date(b.date);

      doc.text(`Bestellung vom ${date.toLocaleDateString()}`, 10, yPos);
      yPos += 10;
  
      if (b.menu1 !== undefined) {
        doc.text(`Menü 1: ${b.menu1!.name} - ${b.menu1!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.menu2 !== undefined) {
        doc.text(`Menü 2: ${b.menu2!.name} - ${b.menu2!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.suppe !== undefined) {
        doc.text(`Suppe: ${b.suppe!.name} - ${b.suppe!.preis} €`, 10, yPos);
        yPos += 10;
      }
      if (b.nachtisch !== undefined) {
        doc.text(`Nachtisch: ${b.nachtisch} - ${b.nachtisch!.preis} €`, 10, yPos);
        yPos += 10;
      }
  
      doc.text(`Vegetarisch: ${b.vegetarisch ? 'Ja' : 'Nein'}`, 10, yPos);
      yPos += 10;

      doc.text(`Gesamtpreis: ${b.kosten} €`, 10, yPos);
      yPos += 20;

     // Überprüfen, ob das Ende der Seite erreicht ist
     if (yPos > doc.internal.pageSize.height - 20 && i !== weeklyBestellungen.length - 1) {
      doc.addPage();
      yPos = 10;
      page++;
      doc.setFontSize(16);
      doc.text('Wöchentliche Bestellungen (Seite ' + page + ')', 10, yPos);
      yPos += 20;
      doc.setFontSize(12);
    }
    });
  
    doc.save(`bestellungen_${weekStart.toLocaleDateString()}_${weekEnd.toLocaleDateString()}.pdf`);
  }
     
}