import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge';

const meta: Meta<BadgeComponent> = {
  title: 'UI/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    color: {
      control: { type: 'inline-radio' },
      options: ['gray', 'green', 'red', 'orange', 'yellow'],
    },
  },
  args: {
    text: 'Badge',
    color: 'gray',
  },
};
export default meta;

type Story = StoryObj<BadgeComponent>;

export const Gray: Story = {
  args: { text: 'Pending', color: 'gray' },
};

export const Green: Story = {
  args: { text: 'Active', color: 'green' },
};

export const Red: Story = {
  args: { text: 'Error', color: 'red' },
};

export const Orange: Story = {
  args: { text: 'Warning', color: 'orange' },
};

export const Yellow: Story = {
  args: { text: 'Info', color: 'yellow' },
};

export const Gallery: Story = {
  render: () => ({
    imports: [BadgeComponent],
    template: `
      <div class="flex flex-wrap gap-2">
        <ui-badge text="Pending" color="gray"></ui-badge>
        <ui-badge text="Active" color="green"></ui-badge>
        <ui-badge text="Error" color="red"></ui-badge>
        <ui-badge text="Warning" color="orange"></ui-badge>
        <ui-badge text="Info" color="yellow"></ui-badge>
      </div>
    `,
  }),
};
