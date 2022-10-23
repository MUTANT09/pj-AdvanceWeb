import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  ListMenu: any;
  constructor(private menu: MenuService, private router: Router,private cartService: CartService) {
    this.onLoading();
  }

  ngOnInit(): void {}

  onLoading() {
    try {
      this.menu.getMenu().subscribe(
        (data) => {
          this.ListMenu = data;
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  onClick() {
    this.router.navigate(['/addmenu']);
  }

  addToCart(id: number){
    this.menu.getSomeMenu(id).quantity -= 1
    this.cartService.add(id);
  }
}
