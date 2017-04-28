const tmpDir = process.argv[2];

const gitLog = require(`${tmpDir}/logs.json`);
const lstat = require(`${tmpDir}/stats.json`);

const zeroedAccumulator = new Proxy({}, { get: (target, name) => target.hasOwnProperty(name) ? target[name] : 0 });
const mergedLog = gitLog.map(o => Object.assign({}, o, { paths: lstat[o.commit] }));
const toSumOfDeletions = (sum, { deletions, insertions }) => sum + (parseInt(deletions) || 0) - (parseInt(insertions) || 0);
const deletions = (paths) => paths.reduce(toSumOfDeletions, 0);

const moniker = longName => longName.match(/\<(.+)@/)[1];

const toDeletionsByName = (memo, { author, paths }) => Object.assign(memo, {
    [moniker(author)]: memo[moniker(author)] + deletions(paths)
});

const deletionsByName = mergedLog.reduce(toDeletionsByName, zeroedAccumulator)
console.log(deletionsByName);
