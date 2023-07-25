// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IWormholeRelayer.sol";

contract LensProtocolRelayer {
    IWormholeRelayer public immutable wormholeRelayer;

    uint256 constant GAS_LIMIT = 5_000_000;

    constructor(address _wormholeRelayer) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function quoteCrossChainLensCall(
        uint16 targetChain
    ) public view returns (uint256 cost) {
        (cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            0,
            GAS_LIMIT
        );
    }

    function sendCrossChainLensCall(
        uint16 targetChain,
        address targetAddress,
        bytes memory payload
    ) public payable {
        uint256 cost = quoteCrossChainLensCall(targetChain);
        require(msg.value == cost);
        wormholeRelayer.sendPayloadToEvm{value: cost}(
            targetChain,
            targetAddress,
            payload,
            0, // no receiver value needed since we're just passing a message
            GAS_LIMIT
        );
    }
}
