import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';
import { ConfirmationComponent } from '../dialogs/confirmation/confirmation.component';
import {SnackbarService} from "../../services/snackbar.service";
import {BookDetails} from "../../interfaces/book-details.model";

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() book: BookDetails;

  constructor(
    private booksService: BooksService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) { }

  deleteBook() {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Remove book',
        message: `Are you sure, you want to remove book: ${this.book?.data?.title}?`
      }
    })
    confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.booksService.deleteBook(this.book?.data?.id)
          .subscribe(() => {
            this.booksService.reloadBooks();
            this.snackbarService.openSnackbar('Deleted successfully');
          });
      }
    });
  }

}
