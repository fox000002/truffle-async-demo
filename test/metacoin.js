var MetaCoin = artifacts.require("MetaCoin");

contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", async function() {
    var meta = await MetaCoin.deployed();
    var balance = await meta.getBalance.call(accounts[0]);
    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });

  it("should call a function that depends on a linked library  ", async function() {
    var meta = await MetaCoin.deployed();
    var metaCoinBalance;
    var metaCoinEthBalance;

    var outCoinBalance = await meta.getBalance.call(accounts[0]);
    metaCoinBalance = outCoinBalance.toNumber();

    var outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
    metaCoinEthBalance = outCoinBalanceEth.toNumber();

    assert.equal(metaCoinEthBalance,2*metaCoinBalance,"Library function returned unexpeced function, linkage may be broken");
  });

  it("should send coin correctly", async function() {
    var meta = await MetaCoin.deployed();

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    var balance = await meta.getBalance.call(account_one);
    account_one_starting_balance = balance.toNumber();

    var balance = await meta.getBalance.call(account_two);
    account_two_starting_balance = balance.toNumber();
    await meta.sendCoin(account_two, amount, {from: account_one});

    var balance = await meta.getBalance.call(account_one);
    account_one_ending_balance = balance.toNumber();

    var balance = await meta.getBalance.call(account_two);
    account_two_ending_balance = balance.toNumber();

    assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
