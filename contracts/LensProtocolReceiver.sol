// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IWormholeRelayer.sol";
import "./interfaces/IWormholeReceiver.sol";

contract LensProtocolReceiver is IWormholeReceiver {
    IWormholeRelayer public immutable wormholeRelayer;
    address public immutable mockProfileCreationProxy;
    address public immutable lensHub;

    constructor(
        address _wormholeRelayer,
        address _mockProfileCreationProxy,
        address _lensHub
    ) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
        mockProfileCreationProxy = _mockProfileCreationProxy;
        lensHub = _lensHub;
    }

    function receiveWormholeMessages(
        bytes calldata payload,
        bytes[] memory, // additionalVaas
        bytes32,
        uint16,
        bytes32 // deliveryHash
    ) public payable override {
        require(msg.sender == address(wormholeRelayer), "Only relayer allowed");
        bytes4 signature = bytes4(payload);

        if (signature == 0x07e5f948) {
            (bool success, ) = mockProfileCreationProxy.call(payload);
            require(success, "Profile Creation Failed");
        } else {
            (bool success, bytes memory result) = lensHub.call(payload);
            if (!success) {
                assembly {
                    // We use Yul's revert() to bubble up errors from the target contract.
                    revert(add(32, result), mload(result))
                }
            }
        }
    }
}
