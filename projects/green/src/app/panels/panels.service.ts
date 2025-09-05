import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Panel } from './panels.model';

const CONNECTIONS_ENDPOINT = `${environment.apiBaseUrl}/panels`;

@Injectable({ providedIn: 'root' })
export class PanelService {
  private http = inject(HttpClient);

  fetchPanels(): Observable<Panel[]> {
    return this.http.get<Panel[]>(CONNECTIONS_ENDPOINT);
  }
}
