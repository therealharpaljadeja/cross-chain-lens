import { ethers } from "hardhat";
import { buildPublicationMetadata } from "./buildPublicationMetadata";
import { getActiveProfile } from "./getActiveProfile";
import { getAuthenticatedClient } from "./getAuthenticatedClient";
import { setupWallet } from "./setupWallet";
import { uploadMetadata } from "./uploadMetadata";

async function main() {
    const wallet = setupWallet();
    const address = await wallet.getAddress();
    const lensClient = await getAuthenticatedClient(wallet);
    const profile = await getActiveProfile(lensClient, address);

    const profileId = profile.id;

    const metadata = buildPublicationMetadata();

    const validateResult = await lensClient.publication.validateMetadata(
        metadata
    );

    if (!validateResult.valid) {
        throw new Error(`Metadata is not valid.`);
    }

    const contentURI = await uploadMetadata(metadata);

    console.log(`Content URI: ${contentURI}`);

    const createPostTypedDataResult =
        await lensClient.publication.createDataAvailabilityPostTypedData({
            from: profileId,
            contentURI,
        });

    const { typedData } = createPostTypedDataResult.unwrap();

    const { domain, types, value } = typedData;

    const {
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
        deadline,
    } = value;

    // Deadline adjustment, workaround for SignatureExpired() error
    value.deadline = (Math.round(Date.now() / 1000) + 24 * 60 * 60).toString();

    // sign with the wallet
    const signedTypedData = await wallet._signTypedData(domain, types, value);

    const { v, r, s } = ethers.utils.splitSignature(signedTypedData);

    const lensProtocolRelayer = await ethers.getContractAt(
        "LensProtocolRelayer",
        "0x3681f10B359879bCe8b29244EBB02F60a219C172"
    );

    let txValue = await lensProtocolRelayer.quoteCrossChainLensCall(5);

    // Encoding payload for postWithSig
    let ABI = [
        "function postWithSig((uint256,string,address,bytes,address,bytes,(uint8,bytes32,bytes32,uint256)))",
    ];

    let iface = new ethers.utils.Interface(ABI);

    let payload = await iface.encodeFunctionData("postWithSig", [
        [
            profileId,
            contentURI,
            collectModule,
            collectModuleInitData,
            referenceModule,
            referenceModuleInitData,
            [v, r, s, value.deadline],
        ],
    ]);

    console.log(`Deadline: ${deadline}`);

    let tx = await lensProtocolRelayer.sendCrossChainLensCall(
        5,
        "0x176f0554302a180815693fB648F7014Dfc59016a", // LensProtocolReceiver
        payload,
        {
            value: txValue,
        }
    );

    console.log(`Transaction: ${tx.hash}`);
}

main();
