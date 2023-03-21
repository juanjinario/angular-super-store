import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  delay,
  from,
  of,
  map,
  mergeMap,
  tap,
  retryWhen,
  retry,
  take,
} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = "https://randomuser.me";

  constructor(private http: HttpClient) {}

  login({ email = "", password = "" }) {
    return of(["000", "001", "002"]);
  }

  getProfileUser() {
    // para comprobarlo podemos poner mal la url
    const url = `${this.baseUrl}/api`;
    return this.http.get(url).pipe(
      // Tap no transforma, se ejecuta solo cuando va de forma positiva
      tap((result) => console.warn("avisar a Google analitycs")),
      // me estoy cargando el array de manera fake, ya veremos otros operadores para juntar un array
      map((user: any) => user.results[0]),
      map((user: any) => ({
        name: user.name,
        login: user.login,
      })),
      // Hace 5 reintentos si es que recibe un error
      retry(5)
    );
  }

  getUserList() {
    const url = `${this.baseUrl}/app?results=10`;
    return this.http.get(url).pipe(
      map((user: any) => user.results),
      // Hace 5 reintentos si es que recibe un error
      retryWhen((errors) =>
        errors.pipe(
          delay(1500),
          tap((err) => console.warn("Reintentando...")),
          take(5)
        )
      )
    );
  }
}
