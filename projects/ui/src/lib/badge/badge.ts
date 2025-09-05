import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeColor = 'green' | 'red' | 'gray' | 'orange' | 'yellow';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      [ngClass]="{
        'bg-green-100 text-green-800': color() === 'green',
        'bg-red-100 text-red-800': color() === 'red',
        'bg-gray-100 text-gray-800': color() === 'gray',
        'bg-orange-100 text-orange-800': color() === 'orange',
        'bg-yellow-100 text-orange-800': color() === 'yellow',
      }"
    >
      {{ text() }}
    </span>
  `,
})
export class BadgeComponent {
  text = input<string>('');
  color = input<BadgeColor>('gray');
}
