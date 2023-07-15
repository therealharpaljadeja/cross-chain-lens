// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IWormholeRelayer.sol";

contract LensProtocolRelayer {
    IWormholeRelayer public immutable wormholeRelayer;

    struct CreateProfileData {
        address to;
        string handle;
        string imageURI;
        address followModule;
        bytes followModuleInitData;
        string followNFTURI;
    }

    uint256 constant GAS_LIMIT = 5_000_000;

    constructor(address _wormholeRelayer) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function quoteCrossChainGreeting(
        uint16 targetChain
    ) public view returns (uint256 cost) {
        (cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            0,
            GAS_LIMIT
        );
    }

    function sendCrossChainGreeting(
        uint16 targetChain,
        address targetAddress,
        CreateProfileData memory profileData
    ) public payable {
        uint256 cost = quoteCrossChainGreeting(targetChain);
        require(msg.value == cost);
        wormholeRelayer.sendPayloadToEvm{value: cost}(
            targetChain,
            targetAddress,
            abi.encodeWithSignature(
                "proxyCreateProfile((address,string,string,address,bytes,string))",
                profileData
            ), // payload
            0, // no receiver value needed since we're just passing a message
            GAS_LIMIT
        );
    }
}
