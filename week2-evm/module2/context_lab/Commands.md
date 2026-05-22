1. Run avil in another terminal
    `anvil`
2. Deploy contracts, use a private key from the anvil accounts
    `forge create src/ContextLab.sol:ContractB --private-key [IP_ADDRESS] --broadcast -vvv`
    
    `forge create src/ContextLab.sol:ContractA --private-key [IP_ADDRESS] --broadcast -vvv`
    
3. Call functions
    - Call the executeCall function. Also add the return types so that it automatically decode the return values.
    `cast call <CONTRACT_A_ADDRESS> "executeCall(address)(address,address)" "<CONTRACT_B_ADDRESS>"`
    
    - Call the executeDelegate function. Also add the return types so that it automatically decode the return values. 
    `cast call <CONTRACT_A_ADDRESS> "executeDelegate(address)(address,address)" "<CONTRACT_B_ADDRESS>"`

    In staticcall the "msg.sender" in the contract B is the address of the contract A, but in delegatecall the "msg.sender" in the contract B is the address of the account which called the function. Context is preserved in delegatecall, but not in staticcall.
    
    