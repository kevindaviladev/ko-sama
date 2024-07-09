import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/categoria.model';
import { KosamaService } from 'src/app/services/kosama.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categorias: Category[] = [];

  constructor(private kosamaService: KosamaService) {}

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.kosamaService.getCategorias().subscribe((res: any) => {
      this.categorias = res;
    });
  }
}
