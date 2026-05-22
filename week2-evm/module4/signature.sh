#!/bin/bash

# 1. Generate a temporary wallet
echo "Generating temporary wallet..."
cast wallet new > temp_wallet.txt
ADDR=$(grep "Address:" temp_wallet.txt | awk '{print $2}')
PK=$(grep "Private key:" temp_wallet.txt | awk '{print $3}')

echo "Address: $ADDR"

# 2. Sign a message
MSG="I am an EVM Engineer"
echo "Signing message: '$MSG'"
SIG=$(cast wallet sign --private-key "$PK" "$MSG")

echo "Signature: $SIG"

# 3. Verify the signature
echo "Verifying signature..."
cast wallet verify --address "$ADDR" "$MSG" "$SIG"

if [ $? -eq 0 ]; then
    echo "Verification SUCCESS!"
else
    echo "Verification FAILED!"
fi

# Cleanup
rm temp_wallet.txt