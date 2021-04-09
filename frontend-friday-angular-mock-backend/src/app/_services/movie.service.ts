import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Movie} from '../_interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchMovies(): Observable<Array<Movie>> {
    return this.http.get(
      environment.BASE_URL + environment.ENDPOINT.MOVIES
    ) as Observable<Array<Movie>>;
  }

  deleteMovies(): Observable<any> {
    return this.http.delete(
      environment.BASE_URL + environment.ENDPOINT.MOVIES
    );
  }
}
