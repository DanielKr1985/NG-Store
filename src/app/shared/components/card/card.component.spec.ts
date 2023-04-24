import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { IProduct } from '../../models';
import { NgForm } from '@angular/forms';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addToCart event when onAddToCart is called', () => {
    const product: IProduct = {
      id: 1,
      title: 'Test Product',
      price: 9.99,
      description: 'A test product',
      category: '',
      images: [],
      rating: 0,
      star: '',
      brand: '',
      stock: 0,
      thumbnail: ''
    };

    spyOn(component.addToCart, 'emit');
    component.onAddToCart(product);
    expect(component.addToCart.emit).toHaveBeenCalledWith(product);
  });

  it('should emit removeFromCart event when onRemoveFromCart is called', () => {
    const product: IProduct = {
      id: 1,
      title: 'Test Product',
      price: 9.99,
      description: 'A test product',
      category: '',
      images: [],
      rating: 0,
      star: '',
      brand: '',
      stock: 0,
      thumbnail: ''
    };

    spyOn(component.removeFromCart, 'emit');
    component.onRemoveFromCart(product);
    expect(component.removeFromCart.emit).toHaveBeenCalledWith(product);
  });
});
