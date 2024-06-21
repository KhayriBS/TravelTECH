import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './componentsfrontoffice/footer/footer.component';
import { HeaderComponent } from './componentsfrontoffice/header/header.component';
import { HomeComponent } from './componentsfrontoffice/home/home.component';
import { BlogArticleGuideComponent } from './componentsfrontoffice/blog-article-guide/blog-article-guide.component';
import { InscriptionComponent } from './componentsfrontoffice/inscription/inscription.component';
import { ReservationComponent } from './componentsfrontoffice/reservation/reservation.component';
import { ProgrammeComponent } from './componentsfrontoffice/programme/programme.component';
import { TopDestinationComponent } from './componentsfrontoffice/top-destination/top-destination.component';
import { AboutAsComponent } from './componentsfrontoffice/about-as/about-as.component';
import { TextilesComponent } from './componentsfrontoffice/textiles/textiles.component';
import { CeramiqueetpoterieComponent } from './componentsfrontoffice/ceramiqueetpoterie/ceramiqueetpoterie.component';
import { BijouterieComponent } from './componentsfrontoffice/bijouterie/bijouterie.component';
import { BoisComponent } from './componentsfrontoffice/bois/bois.component';
import { NourritureComponent } from './componentsfrontoffice/nourriture/nourriture.component';

import { CarrouselComponent } from './componentsfrontoffice/carrousel/carrousel.component';
import { BookingComponent } from './componentsfrontoffice/booking/booking.component';
import { DhashboardComponent } from './componentsbackoffice/dhashboard/dhashboard.component';





@NgModule({
  declarations: [
    AppComponent,
  
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    BlogArticleGuideComponent,
    InscriptionComponent,
    ReservationComponent,
    ProgrammeComponent,
    TopDestinationComponent,
    AboutAsComponent,
    TextilesComponent,
    CeramiqueetpoterieComponent,
    BijouterieComponent,
    BoisComponent,
    NourritureComponent,
  
    CarrouselComponent,
    BookingComponent,
    DhashboardComponent,
 
    
 

    
   
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
