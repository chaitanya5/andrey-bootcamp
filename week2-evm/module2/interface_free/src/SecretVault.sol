// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecretVault {
    mapping(address => uint256) public balances;
    event Deposited(address indexed user, uint256 amount);

    function depositMoney() public payable {
        require(msg.value > 0, "Send ETH");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }
}

contract Middleware {
    function forwardFunds(address _vault) public payable {
        // Manually encode the call to depositMoney()
        (bool success, ) = _vault.call{value: msg.value}(
            abi.encodeWithSignature("depositMoney()")
        );

        // Ensure the transaction reverts if the vault call fails
        require(success, "Vault deposit failed");
    }
}
