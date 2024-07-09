import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/proyecto.models';
import { KosamaService } from 'src/app/services/kosama.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {
  proyecto!: Project;
  constructor(
    private route: ActivatedRoute,
    private kosamaService: KosamaService,
  ) {}

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.kosamaService.getProyecto(id).subscribe((res) => {
      this.proyecto = res;
    });
  }
}
