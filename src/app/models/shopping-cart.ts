import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart{
    items: ShoppingCartItem[];

    get TotalItemsCount(){
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity;
        
        return count;
    }

    getProductIds(){
        return Object.keys(this.items);
    }
}