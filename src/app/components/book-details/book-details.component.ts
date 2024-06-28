import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { switchMap } from 'rxjs/operators';
import {BooksService} from "../../services/books.service";
import {Book} from "../../interfaces/book.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {Client} from "../../interfaces/client.model";
import {Location} from "@angular/common";
import {SnackbarService} from "../../services/snackbar.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  clients$: Observable<Client[]>;
  categories: string[] = ['Literary Fiction', 'Classic Literature', 'Young Adult Fiction', 'Fiction'];
  genres: string[] = ['Novel', 'Dystopian', 'Science Fiction', 'Romance', 'Fantasy', 'Adventure', 'Mystery', 'Thriller', 'Historical Fiction', 'Drama', 'Satire', 'War Novel']

  bookForm: FormGroup;

  constructor(
    private booksService: BooksService,
    private clientsService: ClientsService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(({ id }) => this.booksService.getBookById(id))
      ).subscribe(book => {
      console.log(book)
        this.book = book;
        this.bookForm = this.fb.group({
          id: this.book.id,
          title: [this.book.title, [Validators.required, Validators.minLength(2)]],
          clientId: [this.book.clientId, Validators.required],
          genre: [this.book.genre, Validators.required],
          author: [this.book.author, Validators.required],
          category: [this.book.category, Validators.required]
        })
    });

    this.clients$ = this.clientsService.getClients();
  }

  saveBook(): void {
    this.booksService.saveBook(this.bookForm.value).subscribe(() => {
      this.snackbarService.openSnackbar('Saved successfully');
      this.back();
    });
  }

  back(): void {
    this.location.back();
  }
}
