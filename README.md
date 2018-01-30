## Demo of async / await testing in Truffle

Promises are great, but they have annoying boilerplate in ES6.
Chaining together `.then` calls gets messy quickly.

Latest stable version v8.x of Node.JS offers a cleaner syntax using `async` / `await`. This is a demo
of how to set up Truffle to use this syntax when testing contracts.


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

