const { deletionsByName } = require('./deletionsByName');

const tmpDir = process.argv[2];

const results = deletionsByName({
  logs: require(`${tmpDir}/logs.json`),
  stats: require(`${tmpDir}/stats.json`)
});

console.log(results);
