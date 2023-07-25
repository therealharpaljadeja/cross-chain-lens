import {
    PublicationMainFocus,
    PublicationMetadataDisplayTypes,
    PublicationMetadataV2Input,
} from "@lens-protocol/client";
import { v4 } from "uuid";

export function buildPublicationMetadata(
    meta: Partial<PublicationMetadataV2Input> = {}
): PublicationMetadataV2Input {
    return {
        appId: "lenster",
        attributes: [
            {
                displayType: PublicationMetadataDisplayTypes.String,
                traitType: "Created with",
                value: "Celo Wormhole Bridge",
            },
        ],
        content: "Created using Celo Wormhole Bridge!",
        description: "This post was created from the Celo Alfajores Network!",
        locale: "en-US",
        mainContentFocus: PublicationMainFocus.Image,
        media: [
            {
                item: "ipfs://QmYfjqAHuheeji1cc4ZJqbCrC5NTAdaCjCEnmGZ1F4BbuQ/Screenshot%202023-07-15%20at%201.57.13%20PM.png",
                type: "image/png",
            },
        ],
        image: "ipfs://QmYfjqAHuheeji1cc4ZJqbCrC5NTAdaCjCEnmGZ1F4BbuQ/Screenshot%202023-07-15%20at%201.57.13%20PM.png",
        imageMimeType: "image/png",
        metadata_id: v4(),
        name: "Post created with Celo Wormhole Bridge",
        tags: ["celo", "wormhole", "network-abstraction"],
        version: "2.0.0",
        ...meta,
    };
}
