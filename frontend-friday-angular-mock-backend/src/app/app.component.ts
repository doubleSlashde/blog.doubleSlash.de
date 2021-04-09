import {Component, OnInit} from '@angular/core';
import {Movie} from './_interfaces/movie';
import {MovieService} from './_services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  movies: Array<Movie> = [];

  constructor(
    private readonly movieService: MovieService
  ) {
  }

  ngOnInit(): void {
    this.movieService.fetchMovies().subscribe((response) => {
      this.movies = response;
    });
  }

  deleteMovies(): void {
    this.movieService.deleteMovies().subscribe(() => {
      this.movies = [];
    });
  }
}
