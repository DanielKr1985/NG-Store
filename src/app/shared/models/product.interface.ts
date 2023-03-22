export interface IProduct{
  id:number;
  title:string;
  price:number;
  description:string;
  category:string;
  images:[];
  //rating:IRating;
  rating:number;
  star:string;
  brand:string;
  stock:number;
  thumbnail:string;
}

export interface IRating{
  rate:number;
  count:number;
}

