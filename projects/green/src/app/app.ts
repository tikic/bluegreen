import { Component, OnInit } from '@angular/core';
import { signInWithRedirect, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

type NavItem = { label: string; route: string; icon: string; exact?: boolean };

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  styleUrl: './app.scss',
})
export class App implements OnInit {
  navItems: NavItem[] = [
    { label: 'Panels', route: '/panels', icon: 'panels', exact: true },
    { label: 'Analytics', route: '/analytics', icon: 'analytics' },
  ];

  async ngOnInit() {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens?.idToken) await signInWithRedirect();
      console.log('[GREEN] session:', session);
    } catch (e) {
      console.error('[GREEN] auth error:', e);
    }
  }

  async logout() {
    try {
      await signOut();
    } catch (e) {
      console.error('[GREEN] signOut error:', e);
    }
  }
}
