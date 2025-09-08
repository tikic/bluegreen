import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.stories.ts'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                  },
                },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/,
            sideEffects: true,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 2 } },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                  },
                },
              },
              'sass-loader',
            ],
          },
        ],
      },
    },
  ],
  framework: { name: '@storybook/angular', options: {} },
};
export default config;
