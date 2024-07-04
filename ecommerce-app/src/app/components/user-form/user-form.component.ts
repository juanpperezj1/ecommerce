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
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private apiService: ApiService, private router: Router) {
    const user = history.state.user;
    if (user) {
      this.userForm = { ...user, password: '' };
    }
  }

  createUser(): void {
    this.apiService.createUser(this.userForm).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  updateUser(): void {
    if (this.userForm.id) {
      this.apiService.updateUser(this.userForm.id, this.userForm).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  resetForm(): void {
    this.userForm = {
      name: '',
      email: '',
      password: ''
    };
  }
}
