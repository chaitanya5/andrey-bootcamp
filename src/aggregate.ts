import { createHash } from "node:crypto";

export type Proof = {
    sibling: string,
    position: string
};


export function build_merkle_root(leaves: Array<string>): string {
    // Batch the first 10 elements only
    leaves = leaves.slice(0, 10);

    // Hash the leaves array initially
    leaves = leaves.map(leaf => hash_func(leaf));


    let next_level = [];
    while (leaves.length > 1) {
        next_level = [];

        // Ensure that leaves length is always even to support pairs
        if (leaves.length % 2 == 1) {
            leaves.push(leaves[leaves.length - 1]);
        }
        // console.log(leaves);

        // Pair the adjacents and put them in the next level
        for (let index = 0; index < leaves.length - 1; index += 2) {
            const combined = `${leaves[index]}${leaves[index + 1]}`;
            next_level.push(hash_func(combined))
        }

        leaves = next_level;
    }

    // console.log('root', leaves[0]);
    return leaves[0];   // return root
}

// Same as building root but we also track the sibling and sibling's position 
export function build_proof(leaves: Array<string>, element: string): Array<Proof> {

    let targetIndex = leaves.findIndex((leaf) => leaf === element);
    if (targetIndex == -1) throw new Error("Required element not present in the list");

    // console.log('targetIndex', targetIndex);

    let next_level: Array<string> = []; // Store leaves at every level
    let proof: Array<Proof> = [];   // Store siblings and their positions

    // Hash the leaf nodes initially
    leaves = leaves.map(leaf => hash_func(leaf));

    while (leaves.length > 1) {
        next_level = [];

        // Ensure that leaves length is always even to support pairs
        if (leaves.length % 2 == 1) {
            leaves.push(leaves[leaves.length - 1]);
        }
        // console.log(leaves);

        // Find siblings and their position
        if (targetIndex % 2 == 1) {
            // Current is on right, so sibling is on left
            proof.push({
                sibling: leaves[targetIndex - 1],
                position: 'left'
            })
        }
        else {
            // Current is on left, so sibling is on right
            proof.push({
                sibling: leaves[targetIndex + 1],
                position: 'right'
            })
        }

        // Pair the adjacents and put them in the next level
        for (let index = 0; index < leaves.length; index += 2) {
            const combined = `${leaves[index]}${leaves[index + 1]}`;
            next_level.push(hash_func(combined));
        }

        leaves = next_level;    // Move to the next level
        targetIndex = Math.floor(targetIndex / 2);  // Move to the parent index
    }

    // console.log('Proof & Merkle Root', proof, leaves[0]);
    return proof;
}

export function verify_merkle_proof(merkle_root_hex: string, value: string, proof: Array<Proof>): boolean {
    let current_hash = hash_func(value);
    // let current_hash = value;

    proof.forEach((element:Proof) => {
        current_hash = element.position == 'left' ? hash_func(`${element.sibling}${current_hash}`) : hash_func(`${current_hash}${element.sibling}`);        
    });
    
    if (current_hash === merkle_root_hex) {
        console.log('proof verified');
        return true
    };
    return false;
}

function hash_func(data: string): string {
    const hash = `0x${createHash('sha256').update(data.toString()).digest('hex')}`;
    // console.log('hash of', data, hash);
    return hash;
}


// const elements = ['1', '2', '3', '4', '5', '6'];

// const merkle_root = build_merkle_root(elements);
// const proof = build_proof(elements, '1');
// const verified = verify_merkle_proof(merkle_root, '1', proof);
