import { ethers } from "hardhat";

// 0x9B6dd6d5E4F44f8c45Db4222d712e4DFEb64Cfbf

async function main() {
    const ALFAJORES_RELAYER = "0x306B68267Deb7c5DfCDa3619E22E9Ca39C374f84";
    const LensProtocolRelayer = await ethers.getContractFactory(
        "LensProtocolRelayer"
    );
    const lensProtocolRelayer = await LensProtocolRelayer.deploy(
        ALFAJORES_RELAYER
    );

    await lensProtocolRelayer.deployed();

    console.log(`LensProtocolRelayer: ${lensProtocolRelayer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
