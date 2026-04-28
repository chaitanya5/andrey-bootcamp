import { create_and_sign_batch } from "./sign";
import { build_merkle_root, build_proof } from "./aggregate";
import { BatchExecutor } from "./batch";

function start() {
    console.log("Transaction Mining started ......")
    // Get a batch of signed transactions
    const signed_txns = create_and_sign_batch();

    // Calculate the merkle root hash of the batch
    const root_hash = build_merkle_root(signed_txns);

    // Find merkle proofs for each signed_txn
    const batchOfProofs = signed_txns.map((signed_tx) => build_proof(signed_txns, signed_tx)); 

    // Create the BatchExecutor
    const batch = new BatchExecutor();
    batch.set_batch_root(root_hash);

    // Verify the batch
    batch.execute_batch(signed_txns, batchOfProofs);
}

start();