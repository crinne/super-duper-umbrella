# Setup test node

## Install Bitcoin core

```shell
   brew install bitcoin
```

Note: desktop app doesn't work with cli.

## config lives in bitcoin.conf

testnet=1

when setting values here then cli and bitcoind reads values from here default

#### run in testnet as a daemon (background)
```shell
bitcoind  -testnet -daemon
```

#### stop bitcoin core

```shell
bitcoin-cli -testnet stop
```

#### bitconin-cli

cli can send rpc commands to bitcoind

Example usage:

```shell
bitcoin-cli -testnet getblockchaininfo
```

# Setup Lightning on Mac OS X

follow the guide https://github.com/ElementsProject/lightning/blob/master/doc/getting-started/getting-started/installation.md

Note when pyenv is installed just make sure you activate python

```shell
pyenv shell 3.8.10

```

Run lightning against test node

```shell
./lightningd/lightningd --network=testnet  --log-level=debug
```

#### interacting with lighting

Create invoice

```shell
   lightning-cli --testnet Invoice 1000 For baking 36000
```

List invoices

```shell
   lightning-cli --testnet listinvoices
```
