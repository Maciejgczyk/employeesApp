import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../interfaces/client.model';
import { ClientsService } from '../../../services/clients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../../../services/books.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit, OnDestroy {
  destroyComponent$: Subject<boolean> = new Subject<boolean>();
  allClients: Client[];
  bookForm: FormGroup;

  genres: string[] = ['Novel', 'Dystopian', 'Science Fiction', 'Romance', 'Fantasy', 'Adventure', 'Mystery', 'Thriller', 'Historical Fiction', 'Drama', 'Satire', 'War Novel']
  categories: string[] = ['Literary Fiction', 'Classic Literature', 'Young Adult Fiction', 'Fiction'];
  authors: string[] = ['Harper Lee', 'George Orwell', 'Jane Austen', 'F. Scott Fitzgerald', 'J.K. Rowling', 'J.R.R. Tolkien', 'J.D. Salinger', 'Herman Melville', 'Paulo Coelho', 'Dan Brown', 'Khaled Hosseini', 'Paula Hawkins', 'Gillian Flynn', 'Joseph Heller', 'Stephen King']

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AddBookComponent>,
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private booksService: BooksService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.clientsService
      .getClients()
      .pipe(takeUntil(this.destroyComponent$))
      .subscribe((item) => (this.allClients = item));

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      clientId: ['', Validators.required],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroyComponent$.next();
    this.destroyComponent$.complete();
  }

  createBook(): void {
    if (this.bookForm.valid) {
      this.booksService
        .createBook(this.bookForm.value)
        .subscribe(() => {
          this.booksService.reloadBooks();
          this.snackbarService.openSnackbar('Created successfully');
          this.dialogRef.close();
        });
    }
  }
}
