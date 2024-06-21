import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/Interfaces/product.model';


@Component({
  selector: 'app-produit-artisanat',
  templateUrl: './produit-artisanat.component.html',
  styleUrls: ['./produit-artisanat.component.css']
})
export class ProduitArtisanatComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = this.initializeNewProduct();
  editIndex: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  initializeNewProduct(): Product {
    return {
      _id: '',
      nomP: '',
      descriptionP: '',
      prix: 0,
      Qt: 0,
      image: '',
      stock: 0,
      statusP: false,
      categorie: ''
    };
  }

  setEditMode(index: number): void {
    this.editIndex = index;
    this.newProduct = { ...this.products[index] };
  }

  resetForm(): void {
    this.newProduct = this.initializeNewProduct();
    this.editIndex = null;
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => this.products = data,
      error => console.error(error)
    );
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    // Implement file upload logic as needed
    console.log('Image upload handler to be implemented.');
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      response => {
        console.log(response);
        this.getAllProducts(); // Refresh the product list
        this.resetForm();
      },
      error => console.error(error)
    );
  }

  updateProduct(): void {
    if (this.editIndex !== null) {
      this.productService.updateProduct(this.newProduct._id, this.newProduct).subscribe(
        response => {
          console.log(response);
          this.getAllProducts(); // Refresh the product list
          this.resetForm();
        },
        error => console.error(error)
      );
    }
  }

  deleteProduct(index: number): void {
    const productToDelete = this.products[index];
    this.productService.deleteProduct(productToDelete._id).subscribe(
      response => {
        console.log(response);
        this.getAllProducts(); // Refresh the product list
      },
      error => console.error(error)
    );
  }
}