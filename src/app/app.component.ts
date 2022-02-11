import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, SearchService } from './pages/search/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  articles$ !: Observable<Article[]>;
  title = 'wikiSearch';

  constructor(private readonly searchSvc: SearchService) { }

  onSearch(term: string): void {
    // Recibiendo la data del emit
    this.articles$ = this.searchSvc.search(term);
  }

}
