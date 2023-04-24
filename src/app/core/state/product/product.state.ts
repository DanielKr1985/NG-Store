import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { ProductStateModel } from "./product.model";
import { ClearCart, DeleteCartItem, SetCartItem } from "./product.actions";
import { IProduct } from "src/app/shared/models";

@Injectable()
@State<ProductStateModel>({
  name:'product',
  defaults:{
    CartItems:[]
  }
})

export class ProductState{
  @Action(ClearCart)
  clearCart(ctx:StateContext<ProductStateModel>){
    ctx.patchState({
      CartItems:[],
    })
  }
  @Action(DeleteCartItem)
  DeleteCartItem(ctx:StateContext<ProductStateModel>,action:DeleteCartItem){
    const cartItems:Array<IProduct> = ctx.getState().CartItems;

    const index = cartItems.findIndex((item) => item.id === action.id);
    cartItems.splice(index,1);
    ctx.patchState({
      CartItems:cartItems,
    })
  }

  @Action(SetCartItem)
  SetCartItem(ctx:StateContext<ProductStateModel>,action:SetCartItem){
  const cartItems:Array<IProduct> = ctx.getState().CartItems;
  cartItems.push(action.payload);
  ctx.patchState({
    CartItems:cartItems,
  })

  }
}
