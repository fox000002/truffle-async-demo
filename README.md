## Demo of async / await testing in Truffle

Promises are great, but they have annoying boilerplate in ES6.
Chaining together `.then` calls gets messy quickly.

ES7 offers a cleaner syntax using `async` / `await`. This is a demo
of how to set up Truffle to use this syntax when testing contracts.


### Changes

1. Configure babel with `.babelrc`

2. Install babel dependencies with `npm install` (using `package.json`).

3. `require('babel-polyfill')` at the top of the test file.


### Outcomes

Look at [test/metacoin.js][tests] to see fully.

[tests]: https://github.com/aaren/truffle-async/blob/master/test/metacoin.js

Without `await`:

```javascript
it("should put 10000 MetaCoin in the first account", function(done) {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(accounts[0]).then(function(balance) {
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  }).then(done).catch(done);
});
```

With `await`:

```javascript
it("should put 10000 MetaCoin in the first account", async function() {
  var meta = MetaCoin.deployed();
  var balance = await meta.getBalance.call(accounts[0]);
  assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
});
```

`await` allows us to write asynchronous code that looks synchronous.
Big win for readability.


### Questions

1. Can we get Mocha to insert 'babel-polyfill' on the fly in
   Truffle?

2. Can we avoid installing the dependencies and just use the Truffle
   libs?

3. Do we need `.babelrc`?
