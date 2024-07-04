import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  searchTerm: string = '';

  constructor(private apiService: ApiService, private router: Router) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number): void {
    this.apiService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: User): void {
    this.router.navigate(['/user-form'], { state: { user } });
  }

  createUser(): void {
    this.router.navigate(['/user-form']);
  }

  filteredUsers(): User[] {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
