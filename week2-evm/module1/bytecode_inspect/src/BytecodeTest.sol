// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BytecodeTest {
    uint256 public magicNumber;

    constructor() {
        magicNumber = 42; // This logic only runs once
    }

    function getMagicNumber() public view returns (uint256) {
        return magicNumber; // This logic lives on-chain forever
    }
}
