import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Авторизация';
  public loginForm: FormGroup;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private fb: FormBuilder) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['profile']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: [''],
      password: ['']
    });
  }

  submit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data);
      this.router.navigate(['profile']);
      window.location.reload();
    }, error => {
      console.log(error);
    })

  }

}
