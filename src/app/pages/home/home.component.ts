import { Component, OnInit } from '@angular/core';
import { directus } from 'src/app/services/directus';
import { KosamaService } from 'src/app/services/kosama.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categorias: any[] = [];

  constructor(private kosamaService: KosamaService) { }

  ngOnInit() {
    this.getCategorias()
  }

  getCategorias() {
    this.kosamaService.getCategorias().subscribe((res: any) => {
      console.log(res)
      this.categorias = res
    })

  }

}
