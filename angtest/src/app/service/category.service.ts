import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categorie } from '../Interfaces/categorie.model';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://127.0.0.1:9090'; 

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories/categorieAll`);
  }

  getCategorieById(id: string): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/categories/categorie/${id}`);
  }

  addCategorie(categorie: Categorie): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories/AjouterCategorie`, categorie);
  }

  updateCategorie(id: string, categorie: Categorie): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/categories/update/${id}`, categorie);
  }

  deleteCategorie(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/categories/delete/${id}`, null); // Utilisation de PATCH comme dans votre API Node.js
  }
}