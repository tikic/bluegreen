import { Routes } from '@angular/router';
import { PanelsComponent } from './panels/panels';
import { Analytics } from './analytics/analytics';
import { AuthGuard } from 'auth';

export const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'panels', pathMatch: 'full' },
      { path: 'panels', component: PanelsComponent, title: 'Panels' },
      { path: 'analytics', component: Analytics, title: 'Analytics' },
      { path: '**', redirectTo: 'panels' },
    ],
  },
];
