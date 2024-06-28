import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Subject } from 'rxjs';
import { concatMap, takeUntil } from 'rxjs/operators';
import {BookDetails} from "../../interfaces/book-details.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss'],
})
export class BooksContainerComponent implements OnInit, OnDestroy {
  destroyComponent$: Subject<boolean> = new Subject<boolean>();
  allBooks: BookDetails[];
  books: BookDetails[];

  genres: string[] = ['Novel', 'Dystopian', 'Science Fiction', 'Romance', 'Fantasy', 'Adventure', 'Mystery', 'Thriller', 'Historical Fiction', 'Drama', 'Satire', 'War Novel']
  categories: string[] = ['Literary Fiction', 'Classic Literature', 'Young Adult Fiction', 'Fiction'];
  authors: string[] = ['Harper Lee', 'George Orwell', 'Jane Austen', 'F. Scott Fitzgerald', 'J.K. Rowling', 'J.R.R. Tolkien', 'J.D. Salinger', 'Herman Melville', 'Paulo Coelho', 'Dan Brown', 'Khaled Hosseini', 'Paula Hawkins', 'Gillian Flynn', 'Joseph Heller', 'Stephen King']

  genre: FormControl = new FormControl('')
  author: FormControl = new FormControl('')
  category: FormControl = new FormControl('')

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
    this.booksService.reloadBooks$.subscribe(() => this.getBooks());

    this.booksService.searchValue$
      .pipe(concatMap((value) => this.booksService.searchBooks(value)))
      .subscribe((el) => (this.allBooks = el));

  }

  getBooks(): void {
    this.booksService
      .getBooksWithDetails()
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((items) => {
        this.allBooks = items
        this.books = this.allBooks
      });
  }

  filter(): void {
      const selectedGenre = this.genre.value;
      const selectedCategory = this.category.value;
      const selectedAuthor = this.author.value;
    console.log(this.books)
    console.log(this.allBooks)
      this.allBooks = this.books.filter(book => {
        const genreMatch = selectedGenre === '--' || book.data.genre.includes(selectedGenre);
        const categoryMatch = selectedCategory === '--' || book.data.category.includes(selectedCategory);
        const authorMatch = selectedAuthor === '--' || book.data.author.includes(selectedAuthor);
        return genreMatch && categoryMatch && authorMatch;
      });
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }
}
