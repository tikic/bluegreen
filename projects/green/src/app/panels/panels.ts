import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '@demo/ui';
import { PanelService } from './panels.service';
import { PanelListComponent } from './panel-list/panel-list';
import { Panel } from './panels.model';

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, PanelListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panels.html',
})
export class PanelsComponent {
  private panelService = inject(PanelService);

  panels = signal<Panel[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  panelsCount = computed(() => this.panels().length);
  totalPower = computed(() => this.panels().reduce((acc, p) => acc + (p?.power ?? 0), 0));
  dailyEnergy = computed(() => this.panels().reduce((acc, p) => acc + (p?.dailyEnergy ?? 0), 0));

  ngOnInit(): void {
    this.loadPanels();
  }

  loadPanels(): void {
    this.panelService.fetchPanels().subscribe({
      next: (res) => this.panels.set(res ?? []),
      error: (err) => {
        console.error('PanelsComponent fetchPanels error:', err);
        this.error.set('Failed to load panels. Please try again.');
        this.panels.set([]);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
