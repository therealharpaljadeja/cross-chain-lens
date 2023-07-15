import { ethers } from "hardhat";

// 0xf8c30aFE9cC217BAc6D0DC5FF574c377eAe82238

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
