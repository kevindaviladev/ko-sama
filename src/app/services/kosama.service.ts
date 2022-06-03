import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, pluck, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class KosamaService {
  constructor(private http: HttpClient) {}

  getCategorias() {
    return this.http.get(`${environment.directusBaseUrl}/items/Categoria`).pipe(
      map((res: any) => {
        const newRes = res.data.map((categoria: any) => ({
          id: categoria.id,
          name: categoria.name,
          imagen: `${environment.directusBaseUrl}/assets/${categoria.imagen}`,
          banner: '',
        }));
        return newRes;
      })
    );
  }

  getCategoria(idCategoria: string) {
    return this.http
      .get(
        `${environment.directusBaseUrl}/items/Categoria?filter[id]]=${idCategoria}`
      )
      .pipe(
        map((res: any) => ({
          ...res.data[0],
          imagen: `${environment.directusBaseUrl}/assets/${res.data[0].imagen}`,
        })),
        switchMap((res: any) => {
          // console.log('res', res);
          return this.http
            .get(
              // `${environment.directusBaseUrl}/items/Proyecto?fields=*,fotos.*&filter[id]]=${idCategoria}`
              `${environment.directusBaseUrl}/items/Proyecto?fields=id,name,imagen&filter[id_categoria]=${idCategoria}`
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
              })
            );
        })
      );
  }

  getProyecto(idProyecto: string) {
    return this.http
      .get(
        `${environment.directusBaseUrl}/items/Proyecto?fields=*,fotos.directus_files_id&filter[id]=${idProyecto}`
      )
      .pipe(
        pluck('data'),
        map((res: any) => {
          const proyecto = res[0];
          proyecto.imagen = `${environment.directusBaseUrl}/assets/${proyecto.imagen}`;
          proyecto.fotos = proyecto.fotos.map(
            (foto: any) =>
              `${environment.directusBaseUrl}/assets/${foto.directus_files_id}`
          );
          return proyecto;
        })
      );
  }

}
