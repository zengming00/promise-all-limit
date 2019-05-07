const promiseLimit = require('promise-limit')

function promiseAllLimit(arr, concurrency, mapper) {
    const limit = promiseLimit(concurrency);
    return Promise.all(arr.map(function (item) {
        return limit(function () {
            return mapper(item);
        });
    }));
}

module.exports = promiseAllLimit;