import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.model';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';

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
    const newUserData = {
      accessToken: this.userData?.accessToken,
      user: { ...this.userData.user, ...this.userForm.value },
    };
    if (this.userForm.valid) {
      this.auth.changeUserData(newUserData).subscribe(() => {
        this.snackbarService.openSnackbar('Data changed successfully');
        localStorage.setItem('user', JSON.stringify(newUserData as IUser));
      });
    }
  }

  back(): void {
    this.location.back();
  }
}
