import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksService } from 'src/app/services/books.service';
import { AddBookComponent } from '../dialogs/add-book/add-book.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {IUser} from "../../interfaces/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  search: FormControl = new FormControl('');
  userData: IUser;

  constructor(
    private dialog: MatDialog,
    private booksService: BooksService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.booksService.sendSearchValue(value));

    this.userData = this.auth.getUserData();
  }

  addBook(): void {
    this.dialog.open(AddBookComponent);
  }

  logout(): void {
    this.auth.logout();
  }
}
