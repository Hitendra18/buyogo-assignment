import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  user!: User;
  constructor(private router: Router) {}

  // Logout functionality
  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Checks if user is already logged in
  // if not logged in navigate to login page
  ngOnInit(): void {
    try {
      this.user = JSON.parse(localStorage.getItem('user') || '') as User;
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
