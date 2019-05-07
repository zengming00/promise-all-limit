const promiseAllLimit = require('../index.js');

function job(name) {
    const text = `job ${name}`
    console.log('started', text)
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('       ', text, 'finished')
            resolve(text);
        }, 100)
    })
}

async function foo() {
    try {
        const jobs = ['a', 'b', 'c', 'd', 'e'];
        const results = await promiseAllLimit(jobs, 2, function (item) {
            return job(item);
        });
        console.log('results:', results)
    } catch (e) {
        console.log('eee:', e.message);
    }
}

foo();