import { LensClient, ProfileFragment } from "@lens-protocol/client";

export async function getActiveProfile(
    client: LensClient,
    walletAddress: string
): Promise<ProfileFragment> {
    const ownedProfiles = await client.profile.fetchAll({
        ownedBy: [walletAddress],
        limit: 30,
    });

    if (ownedProfiles.items.length === 0) {
        throw new Error(`You don't have any profiles, create one first`);
    }

    return ownedProfiles.items[ownedProfiles.items.length - 1];
}
