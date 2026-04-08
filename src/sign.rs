use bincode;
use bs58::{decode, encode};
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
            value,
            data: data,
        }
    }

    pub fn sign(&self) -> &[u8] {
        let bytes = bincode::serialize(self).unwrap();
        bytes
    }
}

pub fn create_transactions() -> [Transaction; 10] {
    let signed_txs = [Transaction; 10];

    for i in 0..10 {
        let tx = Transaction::new(format!("0xSENDER{i}"), format!("0xRECEIVER{i}"), i*100, format!("tx-{i}"));
        signed_txs[i] = tx;
    }

    signed_txs
}


#[test]
fn create_transactions() {
    
}