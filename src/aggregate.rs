use bs58;
// use sha2::digest::generic_array::GenericArray; // Import GenericArray for the hash output type
use sha2::digest::typenum::U32; // Import U32 for the size of Sha256 output
use sha2::{Digest, Sha256};
use hex_literal::hex;

pub fn build_merkle_root(mut leaves: Vec<Vec<u8>>) {
    // batch
    leaves.truncate(10);

    // Hash the leaves batch to create an array of leaf hashes
    let mut leaf_hashes_vec: Vec<String> = encode_and_hash(leaves);

    let mut next_level: Vec<String> = Vec::new();

    while leaf_hashes_vec.len() > 1 {
        next_level.clear();
        
        if leaf_hashes_vec.len() %2 == 1 {
            leaf_hashes_vec.push(leaf_hashes_vec.last().unwrap().to_string());
        }

        // Pair adjacent hashes, concatenate and hash
        for i in (0..leaf_hashes_vec.len()).step_by(2) {
            let combined = format!("{}{}", leaf_hashes_vec[i], leaf_hashes_vec[i+1]);
            next_level.push(hash_func(&combined));            
        }

        leaf_hashes_vec = next_level.clone();
    }

}

// Hash the leaves_batch
// pub fn hash(leaves: &Vec<String>) -> GenericArray<u8, U32> {
fn encode_and_hash(leaves: Vec<Vec<u8>>) -> Vec<String> {
        // Encode the bytes to string for easy
    let encoded_leaves_batch: Vec<String> = leaves
        .into_iter()
        .map(|leaf| bs58::encode(leaf).into_string())
        .collect(); // Collect into an owned Vec<String>

    println!(
        "encoded_leaves_batch ======>>>>>>  {:?}",
        encoded_leaves_batch
    );

    let hash_result: Vec<String> = encoded_leaves_batch
        .into_iter()
        .map(|leaf| hash_func(&leaf))
        // bs58::encode(Sha256::digest(leaf)).into_string())
        .collect();

        println!("Hash: {:?}", hash_result);

    return hash_result;
}

fn hash_func(input: &str) -> String {
    bs58::encode(Sha256::digest(input)).into_string()
}

#[cfg(test)]
mod tests {
    use crate::{aggregate::build_merkle_root, sign::create_and_sign_batch};

    #[test]
    fn merkle_root() {
        let signed_txns = create_and_sign_batch();
        println!("{:?}", signed_txns);

        build_merkle_root(signed_txns.to_vec());
    }

    // #[test]
    // fn test() {
    //     use sha2::{Digest, Sha256};

    //     let bytes = b"Secure hashing example"; // Your byte data
    //     let mut hasher = Sha256::new();
    //     hasher.update(bytes);
    //     let hash_result = hasher.finalize();

    //     // Convert the GenericArray output to a hex string
    //     let hash_string = format!("{:x}", hash_result);
    //     println!("Hash: {:?}", hash_result);
    // }
}
