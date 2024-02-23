import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public createTransaction(amount) {
    return this.httpClient.get("https://rangkar-docker-v1.onrender.com/createTransaction/"+amount);
  }

  public markAsDelivered(orderId) {
      return this.httpClient.get("https://rangkar-docker-v1.onrender.com/markOrderAsDelivered/"+orderId)
  }

  public getAllOrderDetailsForAdmin(status: string): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("https://rangkar-docker-v1.onrender.com/getAllOrderDetails/"+status);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("https://rangkar-docker-v1.onrender.com/getOrderDetails");
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete("https://rangkar-docker-v1.onrender.com/deleteCartItem/"+cartId);
  }

  public addProduct(product: FormData) {
    return this.httpClient.post<Product>("https://rangkar-docker-v1.onrender.com/addNewProduct", product);
  }

  public getAllProducts(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Product[]>("https://rangkar-docker-v1.onrender.com/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProductDetailsById(productId) {
    return this.httpClient.get<Product>("https://rangkar-docker-v1.onrender.com/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId: number) {
    return this.httpClient.delete("https://rangkar-docker-v1.onrender.com/deleteProductDetails/"+productId);
  }

  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("https://rangkar-docker-v1.onrender.com/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.httpClient.post("https://rangkar-docker-v1.onrender.com/placeOrder/"+isCartCheckout, orderDetails);
  }

  public addToCart(productId) {
    return this.httpClient.get("https://rangkar-docker-v1.onrender.com/addToCart/"+productId);
  }

  public getCartDetails() {
    return this.httpClient.get("https://rangkar-docker-v1.onrender.com/getCartDetails");
  }
}
