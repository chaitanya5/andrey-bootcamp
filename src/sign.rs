use bincode;
use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct Transaction {
    from_addr: String,
    to_addr: String,
    value: u32,
    data: String,
}

impl Transaction {
    pub fn new(from_addr: String, to_addr: String, value: u32, data: String) -> Self {
        Self {
            from_addr: from_addr,
            to_addr: to_addr,
            value, // Field init shorthand
            data,  // Field init shorthand
        }
    }

    // Simple converting the struct to bytes
    pub fn sign(&self) -> Vec<u8> {
        // Using .expect() is generally preferred over .unwrap() for better error messages
        bincode::serialize(self).expect("Failed to serialize transaction")
    }
}

pub fn create_and_sign_batch() -> [Vec<u8>; 10] {
    let txs_batch: [Transaction; 10] = std::array::from_fn(|i| {
        Transaction::new(
            format!("0xSENDER{i}"),
            format!("0xRECEIVER{i}"),
            (i as u32) * 100,
            format!("tx-{i}"),
        )
    });

    // Use std::array::from_fn to create a new array by signing each transaction
    std::array::from_fn(|i| {
        txs_batch[i].sign()
    })
}

#[cfg(test)]
mod tests { // Renamed for clarity
    use super::create_and_sign_batch; // Use `super` to refer to items in the parent module

    #[test]
    fn create_and_sign_batch_test() {
        let signed_txns = create_and_sign_batch();
        println!("{:?}", signed_txns);
    }
}
