import { defineConfig } from 'staticforge';

const dns = { provider: 'cloudflare', zone: 'elchanio-76.eu' } as const;
const repo = 'elchanio-76/sforge-ci-test';

export default defineConfig({
  site: {
    title: 'sforge CI test',
    baseUrl: 'https://aws.sforge.elchanio-76.eu',
    language: 'en',
  },
  styles: ['/assets/css/site.css'],
  targets: {
    aws: {
      provider: 'aws',
      region: 'eu-north-1',
      domain: 'aws.sforge.elchanio-76.eu',
      previewDomain: 'preview.aws.sforge.elchanio-76.eu',
      dns,
      ci: { repo, branches: ['main'], pullRequests: true },
    },
    azure: {
      provider: 'azure',
      resourceGroup: 'rg-sforge-ci-test',
      location: 'eastus2',
      state: { location: 'northeurope' },
      domain: 'azure.sforge.elchanio-76.eu',
      dns,
      // Deploys to production only through the reviewed environment.
      ci: { repo, branches: [], environments: ['production'], pullRequests: true },
    },
  },
});
