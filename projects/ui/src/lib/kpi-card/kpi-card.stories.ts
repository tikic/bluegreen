import type { Meta, StoryObj } from '@storybook/angular';
import { KpiCardComponent } from './kpi-card';

const meta: Meta<KpiCardComponent> = {
  title: 'UI/KPI Card',
  component: KpiCardComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    unit: { control: 'text' },
    color: {
      control: { type: 'inline-radio' },
      options: ['blue', 'green', 'yellow', 'red'],
    },
  },
  args: {
    label: 'Total Power',
    value: 12.3,
    unit: 'kW',
    color: 'blue',
  },
};
export default meta;

type Story = StoryObj<KpiCardComponent>;

export const Default: Story = {};

export const NoUnit: Story = {
  args: {
    unit: '',
  },
};

export const LongLabel: Story = {
  args: {
    label: 'Total Power Generated Across All Sites (Last 24h)',
    color: 'yellow',
  },
};

export const Green: Story = {
  args: { color: 'green', label: 'Daily Energy', value: 55, unit: 'kWh' },
};

export const Yellow: Story = {
  args: { color: 'yellow', label: 'Panels', value: 18, unit: '' },
};

export const Red: Story = {
  args: { color: 'red', label: 'Alerts', value: 3, unit: '' },
};

export const AllColors: Story = {
  render: (args) => ({
    imports: [KpiCardComponent],
    template: `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ui-kpi-card [label]="'Total Power'" [value]="12.3" unit="kW" color="blue" />
        <ui-kpi-card [label]="'Daily Energy'" [value]="55" unit="kWh" color="green" />
        <ui-kpi-card [label]="'Panels'" [value]="18" color="yellow" />
        <ui-kpi-card [label]="'Alerts'" [value]="3" color="red" />
      </div>
    `,
  }),
};
