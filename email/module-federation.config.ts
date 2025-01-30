import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'email',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
