import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.model';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import {Router} from "@angular/router";
import {ConfirmationComponent} from "../dialogs/confirmation/confirmation.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  userData: IUser;
  userForm: FormGroup;

  constructor(
    private auth: AuthService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userData = this.auth.getUserData();

    this.userForm = this.fb.group({
      nickname: [
        this.userData?.user?.nickname,
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        this.userData?.user?.email,
        [Validators.required, Validators.email],
      ],
    });
  }

  changeUserData(): void {
    const user = this.userForm.value
    if (this.userForm.valid) {
      this.auth.changeUserData(user, this.userData?.user?.id)
        .subscribe(() => {
          this.snackbarService.openSnackbar('Data changed successfully')
          this.router.navigate(['login'])
        })
    }
  }

  back(): void {
    this.location.back();
  }

  deleteAccount() {
    const confirmDialog = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Delete account',
        message: 'Are you sure, you want to delete your account?',
      },
    });
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.auth.deleteUser(this.userData?.user?.id).subscribe(() => {
          this.snackbarService.openSnackbar('Deleted successfully')
          this.router.navigate(['login'])
        })
      }
    });
  }
}

