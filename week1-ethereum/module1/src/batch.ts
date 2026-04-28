import { Proof, verify_merkle_proof } from "./aggregate";

export class BatchExecutor {
    current_batch_root: string;

    constructor() {
        this.current_batch_root = '';
    }

    set_batch_root(root: string) {
        this.current_batch_root = root;
    }

    async execute_batch(
        signed_txns: Array<string>,
        proofs: Array<Array<Proof>>
    ) {
        if (signed_txns.length != proofs.length) throw new Error("Invalid Batch length");
        
        for (let index = 0; index < signed_txns.length; index++) {

            await new Promise((resolve) => setTimeout(resolve, 1000));  // Simulating a delay for merkle verification of thousands of transactions 

            // If any transaction fails merkle proof verification,
            // it means that transaction is invalid and we can discard this entire batch  
            if (!verify_merkle_proof(this.current_batch_root, signed_txns[index], proofs[index])) {
                throw new Error("Batch Validation Failed");
            }
            else {
                // In real life, we usually write the block to the ledger
                console.log(`Transaction ${signed_txns[index]} is verified and can be put in the block`);
            }
        }
    }
}

