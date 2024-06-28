import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book.model';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookDetails } from '../interfaces/book-details.model';
import { ClientsService } from './clients.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public baseUrl = 'http://localhost:3000/employees';

  private bookActions = new Subject<any>();
  private searchBookValue = new Subject<string>();

  public reloadBooks$ = this.bookActions.asObservable();
  public searchValue$ = this.searchBookValue.asObservable();

  constructor(
    private http: HttpClient,
    private clientsService: ClientsService
  ) {}

  reloadBooks(): void {
    this.bookActions.next();
  }

  sendSearchValue(value: string): void {
    this.searchBookValue.next(value);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBooksWithDetails(): Observable<BookDetails[]> {
    return forkJoin([
      this.getBooks(),
      this.clientsService.getClients(),
    ]).pipe(
      map(([book, clients]) =>
        book.map((item) => {
          return {
            data: item,
            client: clients.find((client) => client.id == item.clientId),
          };
        })
      )
    );
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  deleteBook(bookId: number): Observable<Book> {
    return this.http.delete<Book>(`${this.baseUrl}/${bookId}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${book?.id}`, book)
  }

  searchBooks(value: string = ''): Observable<BookDetails[]> {
    return this.getBooksWithDetails().pipe(
      map((books) =>
        books.filter(({ data }) =>
          `${data.title}`.toLowerCase()
            .includes(value.toLowerCase())
        )
      )
    );
  }
}
