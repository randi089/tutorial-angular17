import { Component, input, output, CUSTOM_ELEMENTS_SCHEMA, viewChild, ElementRef, asNativeElements } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    PricePipe,
    TruncateNamePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductComponent {

  constructor (private confirmationService: ConfirmationService) {}

  deleteButton = viewChild<any>('deleteButton');

  product = input.required<Product>();
  edit = output<Product>();
  delete = output<Product>();

  editProduct() {    
    this.edit.emit(this.product());
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton()?.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {    
    this.delete.emit(this.product());
  }

  ngOnInit() {
  }

}
