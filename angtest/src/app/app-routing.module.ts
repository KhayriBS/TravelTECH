import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserprofilComponent } from './pages/userprofil/userprofil.component';
import { IconsComponent } from './pages/icons/icons.component';
import { ProduitArtisanatComponent } from './pages/produit-artisanat/produit-artisanat.component';
import { CategorieProduitComponent } from './pages/categorie-produit/categorie-produit.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserprofilComponent },
  { path: 'produitArtisanat', component: ProduitArtisanatComponent },
  { path: 'categorieProduit', component: CategorieProduitComponent },
  { path: 'icons', component: IconsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
