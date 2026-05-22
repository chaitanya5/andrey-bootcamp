#!/bin/bash
MNEMONIC="test test test test test test test test test test test junk"

echo "Path m/44'/60'/0'/0/0:(Standard ETH Account 0)"
cast wallet address --mnemonic "$MNEMONIC" --mnemonic-derivation-path "m/44'/60'/0'/0/0"

echo "Path m/44'/60'/0'/0/5:(Standard ETH Account 5)"
cast wallet address --mnemonic "$MNEMONIC" --mnemonic-derivation-path "m/44'/60'/0'/0/5"

echo "Path m/44'/0'/0'/0/0:(Standard BTC Account 0)"
cast wallet address --mnemonic "$MNEMONIC" --mnemonic-derivation-path "m/44'/0'/0'/0/0"