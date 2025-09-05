import { Component, input } from '@angular/core';

type KpiColor = 'blue' | 'green' | 'yellow' | 'red';

@Component({
  selector: 'ui-kpi-card',
  standalone: true,
  template: `
    <div
      class="p-4 rounded-2xl shadow text-white"
      [class.bg-blue-500]="color() === 'blue'"
      [class.bg-green-500]="color() === 'green'"
      [class.bg-yellow-500]="color() === 'yellow'"
      [class.bg-red-500]="color() === 'red'"
    >
      <div class="text-sm opacity-80">{{ label() }}</div>
      <div class="text-3xl font-semibold">
        {{ value() }}
        @if (unit()) {
          <span class="text-base opacity-80">{{ unit() }}</span>
        }
      </div>
    </div>
  `,
})
export class KpiCardComponent {
  label = input<string>('');
  value = input<string | number>('');
  unit = input<string>('');
  color = input<KpiColor>('blue');
}
