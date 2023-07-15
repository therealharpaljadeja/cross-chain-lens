import { ethers } from "hardhat";

// 0xD7ae4AcEf9d1388bF09A9EC072f9D99ed77cad7A

async function main() {
    const MUMBAI_RELAYER = "0x0591C25ebd0580E0d4F27A82Fc2e24E7489CB5e0";
    const MockProfileCreationProxy =
        "0x420f0257D43145bb002E69B14FF2Eb9630Fc4736";

    const LensProtocolReceiver = await ethers.getContractFactory(
        "LensProtocolReceiver"
    );
    const lensProtocolReceiver = await LensProtocolReceiver.deploy(
        MUMBAI_RELAYER,
        MockProfileCreationProxy
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
