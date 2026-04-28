import { createHash } from "node:crypto";
import { ethers } from "ethers";


const ABI = [
    "function transfer(address _to, uint256 _value)",
    "function transferFrom(address _from, address _to, uint256 _value)",
    "function approve(address _spender, uint256 _value)",
]

const findSelector = (funcName: string): string => {
    const sanitizedFuncName = sanitize(funcName);

    // String to Bytes
    // const bytesString = new Uint8Array(Buffer.from(sanitizedFuncName, 'utf-8'));
    // const bytesString = ethers.toUtf8Bytes(sanitizedFuncName);
    // console.log('bytesString', bytesString);

    const hash = ethers.keccak256(ethers.toUtf8Bytes(sanitizedFuncName));
    // console.log('hash', hash);
    // const hash = ethers.id(sanitizedFuncName);   // Same as above

    // Selector is 0x + first 4 bytes (8 hex characters)
    const selector = hash.slice(0, 10);
    console.log('selector', selector);
    return selector;
}

const sanitize = (funcName: string): string => {
    const sanitized = funcName
        .replace(/^function\s+/, "")   // Remove 'function' prefix at start
        .replace(/\b(u)?int\b/g, "$1int256") // Convert uint/int to 256-bit versions globally
        .replace(/(\w+)\s+\w+/g, "$1") // Remove argument names like _from, _to, _value
        .replace(/^calldata\s+/, "")   // Remove 'calldata' prefix at start
        .replace(/^memory\s+/, "")   // Remove 'memory' prefix at start
        .replace(/^storage\s+/, "")   // Remove 'storage' prefix at start
        .replace(/\s+/g, "");       // Remove spaces

    // console.log('sanitized', sanitized);

    return sanitized;
}

const calculateCalldata = (target: string, args: any[]): string | undefined => {
    // Find full func from the target
    const funcName = ABI.find((abi, index) => abi.includes(`${target}(`));
    console.log(funcName);

    if (!funcName) {
        throw new Error(`${funcName} not found in the ABI`);
    }

    // Find function selector
    const selector = findSelector(funcName);

    // Encode arguments based on their types
    const argsEncoded = encodeArguments(funcName, args);

    const finalEncodedData = `${selector}${argsEncoded.join("")}`
    console.log('finalEncodedData', finalEncodedData);

    return finalEncodedData;

}


// Every argument type must be of 32 bytes (64 hex characters)
const encodeArguments = (funcName: string, args: any[]): string[] => {

    const extractedTypes: string[] | null = funcName.match(/\b(address|uint|uint256|int|int256)\b/g);
    console.log('extractedTypes', extractedTypes);

    let encodedArgsArr: string[] = [];

    if (args.length !== extractedTypes?.length) {
        throw new Error(`Invalid number of arguments found`);
    }

    // For each argument, encode and concatenate
    args.map((arg, index) => encodedArgsArr.push(encodeData(arg, extractedTypes[index])));

    console.log('encodedArgsArr', encodedArgsArr);

    return encodedArgsArr;
}

const encodeData = (data: any, solidityType: string): string => {
    let encoded: string = '';

    switch (solidityType) {
        case 'address':
            encoded = `${"0".repeat(24)}${data.slice(2)}`       // Left Pad with 24 zeroes
            break;
        case 'uint':
        case 'uint256':
            const hexnum = data.toString(16);
            encoded = `${"0".repeat(64 - hexnum.length)}${hexnum}`    // Left Pad with remaining zeroes
            break;
        default:
            break;
    }

    // console.log('encoded', encoded);
    return encoded;
}


calculateCalldata("transfer", ['0xdadB0d80178819F2319190D340ce9A924f783711', 1000000]);

// ABI.map(abi => {
//     findSelector(abi);
// })
// sanitize("function transferFrom(address _from, address _to, uint _value, uint _value)");

// const num = 1000;
// console.log(num.toString(16), num.toString(16).length);
