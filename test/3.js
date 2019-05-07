const promiseAllLimit = require('../index.js');

function job_reject_b(name) {
    const text = `job ${name}`
    console.log('started', text)
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (name === 'b') {
                return reject(new Error('b reject'));
            }
            console.log('       ', text, 'finished')
            resolve(text);
        }, 100)
    })
}

async function foo() {
    try {
        const jobs = ['a', 'b', 'c', 'd', 'e'];
        const results = await promiseAllLimit(jobs, 3, function (item) {
            return job_reject_b(item).catch(function(err){
                console.log('-----> found err:', err.message);
            });
        });
        console.log('results:', results)
    } catch (e) {
        console.log('err:', e.message);
    }
}

foo();