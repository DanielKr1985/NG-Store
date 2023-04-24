import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
  export class CardComponent {
    @Input() product?: IProduct;
    @Input() isInCart?: boolean;
    @Output() addToCart: EventEmitter<IProduct> = new EventEmitter();
    @Output() removeFromCart: EventEmitter<IProduct> = new EventEmitter();

    public onAddToCart(product:IProduct):void{
      this.addToCart.emit(product);
    }

    public onRemoveFromCart(product:IProduct):void{
      this.removeFromCart.emit(product);
    }


}
