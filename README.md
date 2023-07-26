# Creating Lens Profile and Post on Celo Testnet via Wormhole

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Features](#features)
-   [Contributing](#contributing)
-   [Contact](#contact)
-   [Troubleshooting](#troubleshooting)

## Installation

Clone the repository

```bash
git clone https://github.com/therealharpaljadeja/cross-chain-lens.git
```

Install Dependencies

```bash
npm install
```

Create a `.env` file for environment variables (see `.env.example`)

`PRIVATE_KEY` - Private key of the account which will own the profile and create the post
`THIRDWEB_API_KEY` - ThirdWeb API key for using ThirdWeb IPFS gateway

## Usage

In order to make cross chain calls, you need to deploy `Relayer` on the source chain and `Receiver` on the destination chain

To deploy the `LensProtocolRelayer` on Celo Testnet (Alfajores) use the following command:

```bash
npx hardhat run scripts/deployRelayer.ts --network alfajores
```

To deploy the `LensProtocolReceiver` on the Polygon Testnet (Mumbai) use the following command:

```bash
npx hardhat run scripts/deployReceiver.ts --network mumbai
```

## Features

1. Create Lens Profile

    Using the script `crosschaincreateprofile.ts` you can create Lens profiles!

    Update the script with the `username`, `profilePicture` of choice (can also edit details about `FollowNFT`)

    To create the profile use the following command:

    ```bash
    npx hardhat run scripts/crosschaincreateprofile.ts --network alfajores
    ```

2. Create Lens Post (postWithSig)

    Using the script `createpost/index.ts` you can create Lens posts!

    You can edit the post metadata by editing the `createpost/buildPublicationMetadata.ts` file

    To create the post use the following command:

    ```bash
    npx hardhat run scripts/createpost/index.ts --network alfajores
    ```

    The above command might fail if the ThirdWeb IPFS gateway resolves the url slowly! Just try again.

## Contributing

Open for contributions!

## Contact

Harpalsinh Jadeja - [Email](jadejaharpal14@gmail.com) - [Twitter](https://twitter.com/harpaljadeja11) - [Telegram](https://t.me/harpaljadeja)

## Troubleshooting

Create Issue
