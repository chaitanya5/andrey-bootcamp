import { btoa, Buffer } from "node:buffer";

class Tx {
    private from_addr: string;
    private to_addr: string;
    private value: string;
    private data: string;

    constructor(from_addr: string, to_addr: string, value: string, data: string) {
        this.from_addr = from_addr;
        this.to_addr = to_addr;
        this.value = value;
        this.data = data;
    }

    sign(): string {
        // combine
        const combined = `${this.from_addr}${this.to_addr}${this.value}${this.data}`;
        // encode
        return btoa(combined);
    }
}

export function create_and_sign_batch(): Array<string> {
    const signed_txns = [];

    for (let index = 1; index < 11; index++) {
        signed_txns.push(new Tx(
            `0xSENDER${index}`,
            "0xRECEIVER${index}",
            (100 * index).toString(),
            `tx-${index}`
        ).sign())
    }

    return signed_txns;
}