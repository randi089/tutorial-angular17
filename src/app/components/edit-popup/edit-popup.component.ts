import { CommonModule } from '@angular/common';
import { Component, model, input, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {

constructor(private formBuilder: FormBuilder){}

header = input<string>();

display = model(false);

product = model<Product>({
  name: '',
  image: '',
  price: '',
  rating: 0,
});

confirm = output<Product>();

specialCharacterValidator(): ValidatorFn {
  return (control) => {
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
    return hasSpecialCharacter ? {hasSpecialCharacter: true} : null;
  };
}

productForm = this.formBuilder.group({
  name: ['', [Validators.required, this.specialCharacterValidator()]],
  image: [''],
  price: ['', [Validators.required]],
  rating: [0],
});

ngOnChanges() {
  this.productForm.patchValue(this.product());
}

onConfirm() {
  const { name, image, price, rating } = this.productForm.value;
  
  this.confirm.emit({
    name: name || '',
    image: image || '',
    price: price || '',
    rating: rating || 0,
  });
  this.display.set(false);
}

onCancel() {
 this.display.set(false);
}

}
