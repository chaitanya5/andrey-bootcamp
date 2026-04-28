const index = (encodedCallData: string) => {

    // First find the fucntion selector

    const selector = encodedCallData.slice(0, 10);
    console.log('selector', selector);

    const encodedArguments = encodedCallData.slice(10, encodedCallData.length);

    // Chunks of 64 characters
    let chunks: string[] = [];

    for (let i = 0; i < encodedArguments.length; i += 64) {
        chunks.push(encodedArguments.slice(i, i + 64));
    }

    console.log('chunks', chunks);

    const argumentTypes = findArgumentSoldityTypesFromSelector(selector);

    console.log('argumentTypes', argumentTypes);

    if (chunks.length != argumentTypes?.argTypes?.length) {
        throw new Error("Selector Collision");
    }

    const args = chunks.map((chunk, index) => {
        return decodeArgs(chunk, argumentTypes.argTypes ? argumentTypes.argTypes[index] : "");
    });

    console.log('Selector:', argumentTypes.funcName);
    console.log('Args:', args);
}

const decodeArgs = (argValue: string, argType: string): any => {
    let arg;
    switch (argType) {
        case 'uint':
        case 'uint256':
            const hexMatch = argValue.match(/([a-fA-F0-9]+)$/); // captures one or more hexadecimal characters (0-9, a-f, A-F) located at the end of the string ($).
            //  The match() method returns an array where the first element is the full match and the second element ([1]) is the captured group
            const hexString = hexMatch ? hexMatch[1] : "";
            console.log(hexString); // Output: "1A3F"
            arg = parseInt(hexString, 16);
            break;
        case 'address':
            arg = `0x${argValue.slice(24)}`
            break;
        default:
            break;
    }

    return arg
}


const findArgumentSoldityTypesFromSelector = (selector: string): { funcName: string, argTypes: string[] | undefined } => {
    let funcName: string = '';
    let argTypes: string[] = [];

    switch (selector) {
        case "0xa9059cbb":  // Transfer
            funcName = 'Transfer';
            argTypes = ['address', 'uint256']
            break;

        default:
            break;
    }

    return {
        funcName: funcName,
        argTypes: argTypes
    };
}

index('0xa9059cbb0000000000000000000000002df9b935c44057ac240634c7536511d8aa03028d0000000000000000000000000000000000000000000000000000000005f5e100');