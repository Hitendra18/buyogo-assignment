import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organization } from '../models/organization';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getOrganizations(name: string) {
    return this.http.get<Organization[]>(
      `https://66dc833147d749b72acbc363.mockapi.io/api/organizations?name=${name}`,
    );
  }

  createUser(user: User) {
    return this.http.post<User>(
      'https://66dc833147d749b72acbc363.mockapi.io/api/users',
      user,
    );
  }

  getUser(email: string) {
    return this.http.get<User[]>(
      `https://66dc833147d749b72acbc363.mockapi.io/api/users?email=${email}`,
    );
  }

  loginUser(user: { email: string; password: string }) {
    return this.http.get<User[]>(
      `https://66dc833147d749b72acbc363.mockapi.io/api/users?email=${user.email}&password=${user.password}`,
    );
  }
}
