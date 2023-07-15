// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IWormholeRelayer.sol";
import "./interfaces/IWormholeReceiver.sol";

contract LensProtocolReceiver is IWormholeReceiver {
    IWormholeRelayer public immutable wormholeRelayer;
    address public immutable mockProfileCreationProxy;

    struct CreateProfileData {
        address to;
        string handle;
        string imageURI;
        address followModule;
        bytes followModuleInitData;
        string followNFTURI;
    }

    constructor(address _wormholeRelayer, address _mockProfileCreationProxy) {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
        mockProfileCreationProxy = _mockProfileCreationProxy;
    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additionalVaas
        bytes32, // address that called 'sendPayloadToEvm' (HelloWormhole contract address)
        uint16,
        bytes32 // deliveryHash
    ) public payable override {
        require(msg.sender == address(wormholeRelayer), "Only relayer allowed");
        // (bytes4 signature, address to, string memory handle, string memory profileImageURI, address followModule, bytes memory followModuleInitData, string memory followNFTURI) = abi.decode(payload, (bytes4, address, string, string, address,bytes,string));
        // CreateProfileData memory profileData = CreateProfileData(to, handle, profileImageURI, followModule, followModuleInitData, followNFTURI);
        (bool success, ) = mockProfileCreationProxy.call(payload);
        require(success, "Profile Creation Failed");
    }
}
