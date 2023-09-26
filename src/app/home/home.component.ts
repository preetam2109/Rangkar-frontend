import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images: string[] = [
  //   'https://images.pexels.com/photos/884788/pexels-photo-884788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   'https://images.pexels.com/photos/117139/pexels-photo-117139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  // ];
  // currentSlideIndex: number = 0;
  isDrawerOpen!: boolean;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  images: string[] = [
    'https://e0.pxfuel.com/wallpapers/854/884/desktop-wallpaper-women-pencil-drawing-pencil-sketch.jpg',
    'https://wallpaperaccess.com/full/2155951.jpg',
    'https://www.pixel4k.com/wp-content/uploads/2018/10/margot-robbie-pencil-art-4k_1540746887.jpg'
  ];

  titles: string[] = [
    'Sad Girl',
    'Curious Eyes',
    'Model'
  ];

  descriptions: string[] = [
    'Easy Pencil Drawings Wallpapers Wallpaper Cave #10',
    'Pencil Art Wallpaper 48 pictures #16',
    'Krishna pencil sketch Wallpaper Download MobCup #47'
  ];
  currentImageIndex: number = 0;




  nextSlide() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  pageNumber: number = 0;

  productDetails = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.isDrawerOpen = false;

    setInterval(() => {
      this.nextSlide();
    }, 10000);
    this.getAllProducts();
  }


  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchkeyword);
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) => {
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.productDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  showProductDetails(productId) {
    this.router.navigate(['/productViewDetails', {productId: productId}]);
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
 
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
}
