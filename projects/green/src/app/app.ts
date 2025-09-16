import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AmplifyAuthService } from 'auth';

type NavItem = { label: string; route: string; icon: string; exact?: boolean };

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './app.scss',
})
export class App {
  constructor(private readonly auth: AmplifyAuthService) {}

  navItems: NavItem[] = [
    { label: 'Panels', route: '/panels', icon: 'panels', exact: true },
    { label: 'Analytics', route: '/analytics', icon: 'analytics' },
  ];

  async logout() {
    await this.auth.signOut();
  }
}
