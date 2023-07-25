import * as dotenv from "dotenv";
import { Wallet } from "ethers";

dotenv.config();

export function setupWallet(): Wallet {
    if (!process.env.PRIVATE_KEY) {
        throw new Error("Private key is not defined in .env file");
    }

    return new Wallet(process.env.PRIVATE_KEY);
}

export const walletPrivateKey = process.env.PRIVATE_KEY;
