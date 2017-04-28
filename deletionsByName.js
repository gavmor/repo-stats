const zeroedAccumulator = new Proxy({}, { get: (target, name) => target.hasOwnProperty(name) ? target[name] : 0 });
const toSumOfDeletions = (sum, { deletions, insertions }) => sum + (parseInt(deletions) || 0) - (parseInt(insertions) || 0);
const deletions = (paths) => paths.reduce(toSumOfDeletions, 0);
const moniker = longName => longName.match(/\<(.+)@/)[1];

const toDeletionsByName = (memo, { author, paths }) => Object.assign(memo, {
    [moniker(author)]: memo[moniker(author)] + deletions(paths)
});

const mergedLog = ({logs, stats}) => logs.map(o => Object.assign({}, o, { paths: stats[o.commit] }));
const deletionsByName = ({logs, stats}) => mergedLog({logs, stats}).reduce(toDeletionsByName, zeroedAccumulator)

module.exports = { deletionsByName };
