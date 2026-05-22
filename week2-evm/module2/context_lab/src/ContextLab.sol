// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractB {
    function identify() public view returns (address sender, address current) {
        return (msg.sender, address(this));
    }
}

contract ContractA {
    function executeCall(
        address B
    ) public view returns (address sender, address current) {
        // Standard external call
        (bool success, bytes memory data) = B.staticcall(
            abi.encodeWithSignature("identify()")
        );
        require(success, "Call failed");
        return abi.decode(data, (address, address));
    }

    function executeDelegate(
        address B
    ) public returns (address sender, address current) {
        // Delegatecall
        (bool success, bytes memory data) = B.delegatecall(
            abi.encodeWithSignature("identify()")
        );
        require(success, "Delegatecall failed");
        return abi.decode(data, (address, address));
    }
}
