import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, pluck, switchMap } from 'rxjs/operators';
import { Category } from '../models/categoria.model';
import { Project } from '../models/proyecto.models';
@Injectable({
  providedIn: 'root',
})
export class KosamaService {
  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http
      .get<{
        data: Category[];
      }>(`${environment.directusBaseUrl}/items/Categoria`)
      .pipe(
        map((res) => {
          const newRes = res.data.map((categoria: Category) => ({
            id: categoria.id,
            name: categoria.name,
            imagen: `${environment.directusBaseUrl}/assets/${categoria.imagen}`,
            imagen_principal: `${environment.directusBaseUrl}/assets/${categoria.imagen_principal}`,
            banner: '',
          }));
          return newRes;
        }),
      );
  }

  getCategoria(idCategoria: string) {
    return this.http
      .get<{
        data: Category[];
      }>(
        `${environment.directusBaseUrl}/items/Categoria?filter[id]]=${idCategoria}`,
      )
      .pipe(
        map((res) => ({
          ...res.data[0],
          imagen_principal: `${environment.directusBaseUrl}/assets/${res.data[0].imagen_principal}`,
          imagen_secundaria: `${environment.directusBaseUrl}/assets/${res.data[0].imagen_secundaria}`,
          banner: `${environment.directusBaseUrl}/assets/${res.data[0].banner}`,
        })),
        switchMap((res: any) => {
          return this.http
            .get(
              // `${environment.directusBaseUrl}/items/Proyecto?fields=*,fotos.*&filter[id]]=${idCategoria}`
              `${environment.directusBaseUrl}/items/Proyecto?fields=id,name,imagen&filter[id_categoria]=${idCategoria}`,
            )
            .pipe(
              map((proyectos: any) => {
                console.log('proyectos', proyectos);

                const newProyectos = proyectos.data.map((proyecto: any) => ({
                  ...proyecto,
                  imagen: `${environment.directusBaseUrl}/assets/${proyecto.imagen}`,
                }));
                return {
                  ...res,
                  proyectos: newProyectos,
                };
              }),
            );
        }),
      );
  }

  getProyecto(idProyecto: string) {
    return this.http
      .get<{
        data: Project[];
      }>(
        `${environment.directusBaseUrl}/items/Proyecto?fields=*,fotos.directus_files_id&filter[id]=${idProyecto}`,
      )
      .pipe(
        pluck('data'),
        map((res) => {
          const proyecto = res[0];
          proyecto.imagen = `${environment.directusBaseUrl}/assets/${proyecto.imagen}`;
          proyecto.fotos = proyecto.fotos.map(
            (foto: any) =>
              `${environment.directusBaseUrl}/assets/${foto.directus_files_id}`,
          );
          return proyecto;
        }),
      );
  }
}
