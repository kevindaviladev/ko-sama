import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KosamaService } from 'src/app/services/kosama.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.scss'],
})
export class ProyectoComponent implements OnInit {
  proyecto: any;
  constructor(
    private route: ActivatedRoute,
    private kosamaService: KosamaService
  ) {}

  ngOnInit(): void {
    this.getProyecto();

    // const res = await this.kosamaService.getData().toPromise();
  }

  getProyecto() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.kosamaService.getProyecto(id).subscribe(res => {
      console.log(res)
      this.proyecto = res
    });
  }
}
