const sinon = require("sinon");
const axios = require("axios");

// "is prime" calculator - will be used by stub of axios.get(URL) below
const isPrimeCalc = (num) => {
    for (let i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}

// "stub" for axios.get(URL)
sinon.stub(axios, "get").callsFake((url) => {
    // take url and extract the 'n' from it (after last /)
    const split = url.split('/');
    return isPrimeCalc(parseInt(split[split.length - 1]));
}
);

const isPrime = async (n) => {
    return await axios.get(`http://prime.sisense/is_prime/${n}`);
}

// generator for primes
async function* getPrimesGen(start, end) {
    for (let i = start; i <= end; i++) {
        if(await isPrime(i)) {
            yield i;
        }
    }
}

const getPrimes = async (start, end) => {
    for await (const prime of getPrimesGen(start, end)) {
        console.log(prime);
    }
}

// example (1..100)
console.log("started");
getPrimes(1, 100).then(() => {
    console.log("done");
});