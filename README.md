# ERC20 Bridgeable

ERC20 Template for a bridgeable ERC20 token, to be compatible with the Telos Token Bridge your ERC20 needs to implement our `mint()` and `burnFrom()` method. 

## Install

`npm install`

## Test

`npx hardhat test`

## Deploy

`npx hardhat deploy --network testnet`

_Save the deployment address for bridge registration_

## Verify

`npx hardhat sourcify --network testnet`

_Request can timeout but will still go through_

## Registration on our bridge

You can register your token, as part of an EVM / Antelope pair by following documentation on our [TokenBridge](https://github.com/telosnetwork/telos-token-bridge) repository

_You need to have access to the  address of the token's owner and the contract needs to be verified_

