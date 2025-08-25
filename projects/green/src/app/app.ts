import { Component, OnInit } from '@angular/core';
import { signInWithRedirect, fetchAuthSession, signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="login()">Sign In</button>
  `,
})
export class App implements OnInit {
  async ngOnInit() {
    console.log('[session]', await fetchAuthSession());
  }
  async login()  { await signInWithRedirect(); }
  async logout() { await signOut(); }
}