package state

import (
	"math/big"
	"sync"

	"github.com/ethereum/go-ethereum/common"
)

var GlobalTracker = struct {
	sync.RWMutex
	Balances map[common.Address]*big.Int
}{
	Balances: make(map[common.Address]*big.Int),
}

func init() {
	// Pre-populates with 3 dummy addresses
	dummyAddresses := []string{
		"0x0000000000000000000000000000000000000000",
		"0x000000000000000000000000000000000000dEaD",
		"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // Common dev address
	}

	GlobalTracker.Lock()
	defer GlobalTracker.Unlock()

	for _, addrStr := range dummyAddresses {
		addr := common.HexToAddress(addrStr)
		GlobalTracker.Balances[addr] = big.NewInt(0)
	}
}
