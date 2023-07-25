import { ethers } from "hardhat";

// 0x3b282c0B76C0f5CEDBf389630CECAaD0a37B3D9D

async function main() {
    const MUMBAI_RELAYER = "0x0591C25ebd0580E0d4F27A82Fc2e24E7489CB5e0";
    const MockProfileCreationProxy =
        "0x420f0257D43145bb002E69B14FF2Eb9630Fc4736";
    const LensHub = "0x60Ae865ee4C725cd04353b5AAb364553f56ceF82";

    const LensProtocolReceiver = await ethers.getContractFactory(
        "LensProtocolReceiver"
    );
    const lensProtocolReceiver = await LensProtocolReceiver.deploy(
        MUMBAI_RELAYER,
        MockProfileCreationProxy,
        LensHub
    );

    await lensProtocolReceiver.deployed();

    console.log(`LensProtocolReceiver: ${lensProtocolReceiver.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
