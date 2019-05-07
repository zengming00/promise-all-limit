<a href="https://996.icu"><img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996.icu" /></a>
# promise-all-limit

nodejs, limit the maximum number of concurrent tasks

```sh
npm install promise-all-limit
```

```js
const promiseAllLimit = require('promise-all-limit');

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

async function test() {
    try {
        const jobs = ['a', 'b', 'c', 'd', 'e'];
        const concurrency = 3;
        const results = await promiseAllLimit(jobs, concurrency, function (item) {
            return job_reject_b(item);
        });
        console.log('results:', results)
    } catch (e) {
        console.log('---> err:', e.message);
    }
}

test();
```

will output:

```
started job a
started job b
started job c
        job a finished
started job d
        job c finished
started job e
---> err: b reject
        job d finished
        job e finished
```

# License
MIT
