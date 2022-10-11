# ERC20 Bridgeable

ERC20 Template for a bridgeable ERC20 token, to be compatible with the Telos Token Bridge your ERC20 needs to implement our `mint()` and `burnFrom()` method. 

## Install

`npm install`

## Test

`npx hardhat test`

## Deploy

`npx hardhat deploy --network testnet`

## Registration on our bridge

You can register your token, as part of an EVM / Antelope pair by following documentation on our [TokenBridge](https://github.com/telosnetwork/telos-token-bridge) repository

_Your contract needs to be verified on Teloscan._

