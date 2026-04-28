package ethapi

import (
	"context"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/core/state"
)

// CustomAPI exposes tracking-related RPC methods.
type CustomAPI struct {
}

// NewCustomAPI creates a new instance of CustomAPI.
func NewCustomAPI() *CustomAPI {
	return &CustomAPI{}
}

// GetTrackedBalances returns a map of tracked addresses to their current balances.
func (api *CustomAPI) GetTrackedBalances(ctx context.Context) (map[string]*hexutil.Big, error) {
	state.GlobalTracker.RLock()
	defer state.GlobalTracker.RUnlock()

	results := make(map[string]*hexutil.Big)
	for addr, balance := range state.GlobalTracker.Balances {
		results[addr.Hex()] = (*hexutil.Big)(balance)
	}

	return results, nil
}
