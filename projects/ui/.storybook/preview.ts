import type { Preview } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideZonelessChangeDetection } from '@angular/core';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    angular: { disableZone: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  decorators: [
    applicationConfig({
      providers: [provideZonelessChangeDetection()],
    }),
  ],
};
export default preview;
