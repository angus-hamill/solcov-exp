const { CoverageSubprovider, TruffleArtifactAdapter } = require('@0x/sol-coverage');
const { GanacheSubprovider } = require('@0x/subproviders');
const ProviderEngine = require('web3-provider-engine');

function getCoverageProvider() {
  const coverageSubproviderConfig = {
    isVerbose: true
  };

  const artifactAdapter = new TruffleArtifactAdapter('', '0.5.8');
  const defaultFromAddress = '0xB30FF126Ad1C14a0FF95A69336Df3Dd7997331d4';
  const provider = new ProviderEngine();
  global.coverageSubprovider = new CoverageSubprovider(artifactAdapter, defaultFromAddress, coverageSubproviderConfig);
  provider.addProvider(global.coverageSubprovider);
  ganacheSubprovider = new GanacheSubprovider({
    mnemonic: 'like dinosaur chat weapon clay airport tube seat upper tattoo arrange bundle tackle inmate crowd',
    gasLimit: 0xfffffffffff
  });
  provider.addProvider(ganacheSubprovider);
  provider.start((err) => {
    if (err !== undefined) {
      error(err);
    }
  });

  provider.send = provider.sendAsync.bind(provider);
  return provider;
}

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    coverage: {
      provider: getCoverageProvider(),
      port: 8545,
      network_id: "*",
      gas: 0xfffffffffff,
      gasPrice: 0x1
    },
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: false, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
