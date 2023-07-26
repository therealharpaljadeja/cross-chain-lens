import { PublicationMetadataV2Input } from "@lens-protocol/client";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

export async function uploadMetadata(metadata: PublicationMetadataV2Input) {
    // First, instantiate the thirdweb IPFS storage
    const storage = new ThirdwebStorage({
        apiKey: process.env.THIRDWEB_API_KEY,
    });

    const uri = await storage.upload(metadata);

    // Here we a URL with a gateway that we can look at in the browser
    const url = await storage.resolveScheme(uri);

    return url;
}
