## Hands-On Exercises

1. Function Selectors via Python Below is the interface for an ERC20 token:
`   function transfer(address _to, uint256 _value)
    function transferFrom(address _from, address _to, uint256 _value)
    function approve(address _spender, uint256 _value)
`
Write a Python script using the web3.py library or standard hashlib to programmatically compute the function selectors for all three methods. Hint: Remember to remove all spaces and variable names before hashing!

2. Manual Calldata Construction Given the methods above, write out the exact raw hexadecimal calldata payload (Selector + Padded Arguments) for the following call:
`Target: Transfer
To: 0xdadB0d80178819F2319190D340ce9A924f783711
Value: 1000000 (You will need to convert this to hex first).`
3. Reverse Engineering Calldata Decode this raw calldata payload manually and explain exactly what method is being called and what the parameters are:
`0xa9059cbb0000000000000000000000002df9b935c44057ac240634c7536511d8aa03028d0000000000000000000000000000000000000000000000000000000005f5e100`

4. The Collision Problem Go to the 4byte.directory. Search for the selector `0xa9059cbb`. You will see that it maps to `transfer(address,uint256)`, but it might also map to other bizarrely named functions. Explain computationally why two completely different function names can result in the exact same 4-byte selector.