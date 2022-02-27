import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {User} from "../../models/User";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public role: string;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService) {
    userService.getUser().subscribe(data => {
      this.user = data;
      this.role = data.authorities[0].authority;
    }, error => {
      tokenService.logout();
    })
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.tokenService.logout();
  }
}
