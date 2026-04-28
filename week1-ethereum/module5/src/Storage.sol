pragma solidity ^0.8.12;

contract Storage {
    struct MyStorageStruct {
        uint256 number;
        string owner;
        string note;
    }

    MyStorageStruct myStorage;

    function store(MyStorageStruct calldata newStorage) public {
        // length of the note should be greater than 10 characters
        if (bytes(newStorage.note).length <= 10) {
            revert("Owner too small");
        }
        myStorage = newStorage;
    }

    function retrieveNumber() public view returns (uint256){
        return myStorage.number;
    }
}