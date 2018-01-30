## Demo of async / await testing in Truffle

Promises are great, but they have annoying boilerplate in ES6.
Chaining together `.then` calls gets messy quickly.

Latest stable version v8.x of Node.JS offers a cleaner syntax using `async` / `await`. This is a demo
of how to set up Truffle to use this syntax when testing contracts.


### Outcomes

Look at [test/metacoin.js][tests] to see fully.

[tests]: https://github.com/fox000002/truffle-async-demo/blob/master/test/metacoin.js

Without `await`:

```javascript
it("should put 10000 MetaCoin in the first account", function(done) {
  MetaCoin.deployed().then(function(meta) {;
    meta.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    }).then(done).catch(done);
  });
});
```

With `await`:

```javascript
it("should put 10000 MetaCoin in the first account", async function() {
  var meta = await MetaCoin.deployed();
  var balance = await meta.getBalance.call(accounts[0]);
  assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
});
```

`await` allows us to write asynchronous code that looks synchronous.
Big win for readability.

### How to run

- Install node.js v8+

- Install truffle

```bash
$ npm install -g truffle
```

- Run [Ganache](http://truffleframework.com/ganache/)

- Run tests

```bash
$ truffle test
Compiling ./contracts/ConvertLib.sol...
Compiling ./contracts/MetaCoin.sol...
Compiling ./contracts/Migrations.sol...


  Contract: MetaCoin
    ✓ should put 10000 MetaCoin in the first account (46ms)
    ✓ should call a function that depends on a linked library   (120ms)
    ✓ should send coin correctly (134ms)


  3 passing (525ms)
```
