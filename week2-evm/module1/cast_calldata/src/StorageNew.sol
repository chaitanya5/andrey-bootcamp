// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;

contract Storage {
    struct StorageStruct {
        uint256 number;
        string owner;
    }

    StorageStruct myStorage;
    uint256 public version = 0;

    function store(StorageStruct calldata newStorage, uint256 _version) public {
        require(
            _version == version + 1,
            "Invalid Version, must be the next consequent number"
        );
        myStorage = newStorage;
        version = _version;
    }

    function retrieve() public view returns (StorageStruct memory, uint256) {
        return (myStorage, version);
    }
}
