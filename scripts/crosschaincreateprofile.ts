import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    const lensProtocolRelayer = await ethers.getContractAt(
        "LensProtocolRelayer",
        "0xEc82d87B502c9450B2fE49888F6495931Bc9ca6a"
    );

    let value = await lensProtocolRelayer.quoteCrossChainLensCall(5);

    let ABI = [
        "function proxyCreateProfile((address,string,string,address,bytes,string))",
    ];

    let iface = new ethers.utils.Interface(ABI);

    let payload = await iface.encodeFunctionData("proxyCreateProfile", [
        [
            deployer.address,
            "celowormholedemo1", // username
            "https://ipfs.thirdwebstorage.com/ipfs/QmZWRrxaesV3gu4mLnqTe4AnuHjF1iobbHvLD4CxUziqDx/FCFF52.png", // profilePicture
            "0x0000000000000000000000000000000000000000", // Follow Module
            "0x", // Follow Module Init Data
            "https://ipfs.thirdwebstorage.com/ipfs/QmZWRrxaesV3gu4mLnqTe4AnuHjF1iobbHvLD4CxUziqDx/FCFF52.png", // Follow NFT Image
        ],
    ]);

    let tx = await lensProtocolRelayer.sendCrossChainLensCall(
        5, // Mumbai
        "0x463395C97425510161f3dE8bcEBD6D4596F02Fbe", // LensProtocolReceiver
        payload,
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
