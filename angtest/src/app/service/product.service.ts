import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:9090';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/produits/productsAll`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/produits/produit/${id}`);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/produits/products`, product); // Assurez-vous que l'API d'ajout est correctement définie dans votre backend
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/produits/update/${id}`, product); // Assurez-vous que l'API de mise à jour est correctement définie dans votre backend
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/produits/delete/${id}`); // Assurez-vous que l'API de suppression est correctement définie dans votre backend
  }
}