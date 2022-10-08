// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract ERC20Bridgeable is ERC20, ERC20Burnable {
    address public bridge;

    constructor(address _bridge, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        bridge = _bridge;
    }

    modifier onlyBridge() {
        require(
            bridge == msg.sender,
            "BridgeableERC20: only the bridge can trigger this method !"
        );
        _;
    }

    // @dev called from the Antelope bridge when tokens are locked on Antelope side
    function mint(address _recipient, uint256 _amount)
        public
        virtual
        onlyBridge
    {
        _mint(_recipient, _amount);
    }

    // @dev called by the EVM bridge before adding a new request
    function burnFrom(address _account, uint256 _amount)
        public
        virtual
        override(ERC20Burnable)
        onlyBridge
    {
        super.burnFrom(_account, _amount);
    }
}
