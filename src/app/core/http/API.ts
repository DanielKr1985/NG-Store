export const Routes:{[key:string] : any} = {
  allProducts: 'https://dummyjson.com/products',
  singleProduct: (productId: string) => 'https://dummyjson.com/products/'+productId,
  //singleProduct: (productId: string) => 'https://dummyjson.com/products/1'
}
