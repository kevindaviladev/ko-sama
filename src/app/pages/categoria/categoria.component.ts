import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/categoria.model';
import { Project } from 'src/app/models/proyecto.models';
import { KosamaService } from 'src/app/services/kosama.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  categoria!: Category & { proyectos: Project[] };
  constructor(
    private route: ActivatedRoute,
    private kosamaService: KosamaService,
  ) {}

  ngOnInit(): void {
    this.getCategoria();
  }

  getCategoria() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.kosamaService.getCategoria(id).subscribe((res) => {
        this.categoria = res;
        console.log(this.categoria);
      });
  }
}
