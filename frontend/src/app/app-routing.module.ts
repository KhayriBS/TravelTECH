import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentsfrontoffice/home/home.component';
import { TextilesComponent } from './componentsfrontoffice/textiles/textiles.component'; 
import { CeramiqueetpoterieComponent } from './componentsfrontoffice/ceramiqueetpoterie/ceramiqueetpoterie.component';
import { BijouterieComponent } from './componentsfrontoffice/bijouterie/bijouterie.component';
import { BoisComponent } from './componentsfrontoffice/bois/bois.component';
import { NourritureComponent } from './componentsfrontoffice/nourriture/nourriture.component';
import { DhashboardComponent } from './componentsbackoffice/dhashboard/dhashboard.component';




const routes: Routes = [
  
  { path :'', component: HomeComponent},
  { path: 'textiles', component: TextilesComponent },
  { path: 'ceramiqueetpoterie', component: CeramiqueetpoterieComponent },
  { path: 'bijouterie', component: BijouterieComponent },
  { path: 'bois', component: BoisComponent },
  { path: 'nourriture', component: NourritureComponent },



];


@NgModule({
  imports: [
  RouterModule.forRoot(routes)],

 

  exports: [RouterModule]
})
export class AppRoutingModule { }
