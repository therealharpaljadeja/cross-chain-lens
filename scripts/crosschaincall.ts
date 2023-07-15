import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    const lensProtocolRelayer = await ethers.getContractAt(
        "LensProtocolRelayer",
        "0xf8c30aFE9cC217BAc6D0DC5FF574c377eAe82238"
    );

    let value = await lensProtocolRelayer.quoteCrossChainGreeting(5);

    let tx = await lensProtocolRelayer.sendCrossChainGreeting(
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
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
