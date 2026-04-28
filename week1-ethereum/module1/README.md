## Exercise: Design a Simple Transaction Batcher

You are asked to design a very simple transaction batcher platform that processes transactions in batches of 10.

The system is split into three Python modules:

- sign.py – prepares and “signs” transactions

- aggregate.py – aggregates signed transactions and builds a Merkle root

- batch.py – stores batch roots and verifies + executes batches based on Merkle proofs


You don’t need real cryptography here, a simple placeholder “signature” is enough.

**1. sign.py: define a transaction and “sign” it**

Create a file called sign.py with:

A Tx class (or @dataclass) representing a transaction:

```
class Tx:
    def __init__(self, from_addr: str, to_addr: str, value: str, data: str):
        self.from_addr = from_addr  # sender
        self.to_addr = to_addr      # recipient
        self.value = value          # amount (string for now)
        self.data = data            # calldata / extra data



A function that “signs” a transaction.

 For this exercise, signing is just encoding the fields into bytes (no real crypto needed):
def sign(tx: Tx) -> bytes:
    """
    Fake signing: serialize the transaction into bytes.
    In a real system this would be hashed and signed with a private key.
    """
    encoded = f"{tx.from_addr}|{tx.to_addr}|{tx.value}|{tx.data}"
    return encoded.encode("utf-8")


3. In sign.py, write a loop that creates 10 dummy transactions, signs each of them, and passes the signed messages to the aggregator (you can simulate this by returning a list or printing them):
def create_and_sign_batch() -> list[bytes]:
    signed_txs = []
    for i in range(1, 11):
        tx = Tx(
            from_addr=f"0xSENDER{i}",
            to_addr=f"0xRECEIVER{i}",
            value=str(100 * i),
            data=f"tx-{i}"
        )
        signed_txs.append(sign(tx))
    return signed_txs

```





**2. aggregate.py: aggregate signed messages and build a Merkle root**

Create a file called aggregate.py with:
A function that accepts signed transactions, and once it has 10 of them, 
- Builds a Merkle tree over the 10 signed messages
- Returns the Merkle root (as bytes or str) to be sent to the batch executor


You can define the interface as:

```
def build_merkle_root(leaves: list[bytes]) -> bytes:
    """
    Given 10 signed transactions, build a Merkle tree and return its root.
    You can use a simple hash function like sha256 over concatenated children.
    """
    ...

```
A function that aggregates messages until it has 10:

```
class BatchExecutor:
    def __init__(self):
        self.current_batch_root: bytes | None = None

    def set_batch_root(self, root: bytes) -> None:
        """
        Store the Merkle root for the current batch.
        """
```
Verify proofs and “execute” the batch

Define a method that:


Receives:


the list of signed transactions


their corresponding Merkle proofs


Verifies that all transactions belong to the stored Merkle root


If all proofs are valid → “execute” the transactions (you can just print them or append them to a list)


If one proof fails → reject the entire batch


Example signature:

```
def execute_batch(
    self,
    signed_txs: list[bytes],
    proofs: list[list[bytes]]
) -> None:
    """
    Verify all proofs against current_batch_root.
    If any proof is invalid → drop the whole batch.
    If all are valid → execute all transactions.
    """
    ...
```