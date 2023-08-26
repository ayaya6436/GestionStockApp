import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
 
  @Output() formDataSubmitted = new EventEmitter<any>();

  popupForm: FormGroup;

  constructor(private fb: FormBuilder,private ref:MatDialogRef<PopupComponent>) {
    this.popupForm = this.fb.group({
      date: [new Date(), Validators.required], 
      quantite: [0, Validators.required],      
      prix_unitaire: [0, Validators.required], 
      montant: [0, Validators.required],       
      produit: ['', Validators.required],      
      description: ['', Validators.required],  
    });
  }

  closePopup() {
    this.ref.close();

  }
  onSubmit() {
    if (this.popupForm.valid) {
      // Émettre les données du formulaire
      this.formDataSubmitted.emit(this.popupForm.value);
      this.popupForm.reset();
    }
  }
}
