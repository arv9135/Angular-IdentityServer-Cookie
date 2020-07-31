import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';
  isAuthenticated: boolean;
  constructor(private authService: AuthService) {

  }
  async ngOnInit() {
    await this.authService.checkAuth().toPromise();
    this.authService.isLoggedIn().subscribe((isAuthenticated) => this.isAuthenticated = isAuthenticated)
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
