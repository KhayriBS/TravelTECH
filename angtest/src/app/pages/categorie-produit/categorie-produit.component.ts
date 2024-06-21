import { Component } from '@angular/core';
import { CategorieService } from 'src/app/service/category.service';
import { Categorie } from 'src/app/Interfaces/categorie.model';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.css']
})
export class CategorieProduitComponent {


  categories: Categorie[] = [];
  newCategorie: Categorie = {
    _id: '',
    nomC: '',
    descriptionC: '',
    nbrProduit: 0,
    statusC: false
  };
  editIndex: number | null = null;
  formSubmitted: boolean = false;

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      categories => this.categories = categories,
      error => console.error(error)
    );
  }

  addCategorie(): void {
    this.categorieService.addCategorie(this.newCategorie).subscribe(
      categorie => {
        console.log('Nouvelle catégorie ajoutée:', categorie);
        this.getAllCategories(); // Rafraîchir la liste des catégories
        this.resetForm();
      },
      error => console.error(error)
    );
  }

  updateCategorie(): void {
    if (this.editIndex !== null) {
      const categorieToUpdate = this.categories[this.editIndex];
      this.categorieService.updateCategorie(categorieToUpdate._id!, this.newCategorie).subscribe(
        categorie => {
          console.log('Catégorie mise à jour:', categorie);
          this.getAllCategories(); // Rafraîchir la liste des catégories
          this.resetForm();
          this.editIndex = null;
        },
        error => console.error(error)
      );
    }
  }

  deleteCategorie(index: number): void {
    const categorieToDelete = this.categories[index];
    this.categorieService.deleteCategorie(categorieToDelete._id!).subscribe(
      categorie => {
        console.log('Catégorie supprimée:', categorie);
        this.getAllCategories(); // Rafraîchir la liste des catégories
      },
      error => console.error(error)
    );
  }

  resetForm(): void {
    this.newCategorie = {
      _id: '',
      nomC: '',
      descriptionC: '',
      nbrProduit: 0,
      statusC: false
    };
    this.formSubmitted = false; // Réinitialiser l'état de soumission du formulaire
  }

  setEditMode(index: number): void {
    this.editIndex = index;
    // Pré-remplir le formulaire avec les données de la catégorie à modifier
    const categorieToEdit = this.categories[index];
    this.newCategorie = { ...categorieToEdit };
  }

  submitForm(): void {
    this.formSubmitted = true;
    if (this.editIndex !== null) {
      this.updateCategorie();
    } else {
      this.addCategorie();
    }
  }

  
}