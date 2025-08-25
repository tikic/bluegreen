import { Component } from '@angular/core';
import { signInWithRedirect, signOut, fetchAuthSession } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  async ngOnInit() {
    try {
      console.log(await fetchAuthSession());
    } catch (e) {
      console.error('fetchAuthSession:', e);
    }
  }

  async login() {
    try {
      await signInWithRedirect();
    } catch (e) {
      console.error('signInWithRedirect:', e);
    }
  }
}
