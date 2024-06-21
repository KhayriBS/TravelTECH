import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserprofilComponent } from './pages/userprofil/userprofil.component';
import { IconsComponent } from './pages/icons/icons.component';
import { ProduitArtisanatComponent } from './pages/produit-artisanat/produit-artisanat.component';
import { CategorieProduitComponent } from './pages/categorie-produit/categorie-produit.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    UserprofilComponent,
    IconsComponent,
    ProduitArtisanatComponent,
    CategorieProduitComponent,
   

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
