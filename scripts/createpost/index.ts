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

    const createPostTypedDataValue = createPostTypedDataResult.unwrap();

    console.log(
        `createDataAvailabilityPostTypedData result: `,
        createPostTypedDataValue
    );

    // sign with the wallet
    const signedTypedData = await wallet._signTypedData(
        createPostTypedDataValue.typedData.domain,
        createPostTypedDataValue.typedData.types,
        createPostTypedDataValue.typedData.value
    );

    const { v, r, s } = ethers.utils.splitSignature(signedTypedData);

    const lensProtocolRelayer = await ethers.getContractAt(
        "LensProtocolRelayer",
        "0xf8c30aFE9cC217BAc6D0DC5FF574c377eAe82238"
    );

    let value = await lensProtocolRelayer.quoteCrossChainGreeting(5);

    let tx = await lensProtocolRelayer.sendCrossChainLensCall(
        5,
        "0xD7ae4AcEf9d1388bF09A9EC072f9D99ed77cad7A", // LensProtocolReceiver
        {
            to: deployer.address,
            handle: "dummyprofiletesting12345",
            followModule: "0x0000000000000000000000000000000000000000",
            followModuleInitData: "0x",
            followNFTURI:
                "https://ipfs.thirdwebstorage.com/ipfs/QmZWRrxaesV3gu4mLnqTe4AnuHjF1iobbHvLD4CxUziqDx/FCFF52.png",
            imageURI:
                "https://ipfs.thirdwebstorage.com/ipfs/QmZWRrxaesV3gu4mLnqTe4AnuHjF1iobbHvLD4CxUziqDx/FCFF52.png",
        },
        {
            value,
        }
    );

    console.log(`Transaction: ${tx.hash}`);

    // encodeWithSignature
}

main();
