import { Routes } from '@angular/router';
import { PanelsComponent } from './panels/panels';
import { Analytics } from './analytics/analytics';

export const routes: Routes = [
  { path: '', redirectTo: 'panels', pathMatch: 'full' },
  { path: 'panels', component: PanelsComponent, title: 'Panels' },
  { path: 'analytics', component: Analytics, title: 'Analytics' },
  { path: '**', redirectTo: 'panels' },
];
