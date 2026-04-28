// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;


import {Test} from "forge-std/Test.sol";
import {Storage} from "../src/Storage.sol";

contract StorageTest is Test {
    Storage public storageContract;
    function setUp() public {
        storageContract = new Storage();
    }
    function testStoreStruct() public {
        Storage.MyStorageStruct memory input = Storage.MyStorageStruct({
            number: 25,
            owner: "bob123123123",
            note: "notenotenotenote"
        });
        storageContract.store(input);
    }

    function testStoreStructReverts() public {
        Storage.MyStorageStruct memory input = Storage.MyStorageStruct({
            number: 101,
            owner: "too much",
            note: "note"
        });

        vm.expectRevert("Owner too small");
        storageContract.store(input);
    }
}
