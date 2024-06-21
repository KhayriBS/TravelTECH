import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
    public pageTitle: string;
  
    constructor(private router: Router) {
      this.pageTitle = 'Dashboard'; // Titre par défaut
    }
  
    ngOnInit() {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateTitle(event.urlAfterRedirects);
        }
      });
    }
  
    updateTitle(url: string) {
      if (url.includes('/dashboard')) {
        this.pageTitle = 'Dashboard';
      } else if (url.includes('/user-profile')) {
        this.pageTitle = 'User Profile';
      }else if (url.includes('/produitArtisanat')) {
        this.pageTitle = 'Produit Artisanat';
      }else if (url.includes('/categorieProduit')) {
        this.pageTitle = 'categorieProduit';
      }else if (url.includes('/icons')) {
        this.pageTitle = 'Icons';
      }

      // Ajoutez d'autres conditions pour d'autres routes si nécessaire
    }

}
