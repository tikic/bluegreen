import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Panel } from '../panels.model';
import { BadgeComponent } from 'ui';
import moment from 'moment';

@Component({
  selector: 'app-panel-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './panel-list.html',
})
export class PanelListComponent {
  @Input({ required: true }) panels: Panel[] = [];
  @Input() pageSize = 20;

  search = '';
  pageIndex = 1;

  get filteredPanels(): Panel[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.panels;
    this.pageIndex = 1;
    return this.panels.filter((p) => JSON.stringify(p).toLowerCase().includes(q));
  }

  getTempColor(temp: number): 'gray' | 'green' | 'yellow' | 'orange' | 'red' {
    if (temp < 20) return 'gray';
    if (temp < 40) return 'green';
    if (temp < 60) return 'yellow';
    if (temp < 80) return 'orange';
    return 'red';
  }

  formatDate(date: string | Date): string {
    return moment(date).format('DD.MM.YYYY');
  }

  pagedPanels(): Panel[] {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredPanels.slice(start, start + this.pageSize);
  }

  get totalItems(): number {
    return this.filteredPanels.length;
  }

  showingFrom(): number {
    if (this.totalItems === 0) return 0;
    return (this.pageIndex - 1) * this.pageSize + 1;
  }

  showingTo(): number {
    return Math.min(this.totalItems, this.pageIndex * this.pageSize);
  }

  canPrev(): boolean {
    return this.pageIndex > 1;
  }

  canNext(): boolean {
    return this.pageIndex * this.pageSize < this.totalItems;
  }

  prevPage(): void {
    if (this.canPrev()) this.pageIndex--;
  }

  nextPage(): void {
    if (this.canNext()) this.pageIndex++;
  }
}
