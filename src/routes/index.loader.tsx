import { routeLoader$ } from "@builder.io/qwik-city";
import { PrivyClient } from "@privy-io/server-auth";

let i = 1;

// eslint-disable-next-line qwik/loader-location
export const useLoader = routeLoader$(
  /**
   *
   * @param requestEvent
   * @returns
   */
  async (requestEvent) => {
    const cookie = requestEvent.cookie;
    const privyToken = cookie.get("privy-token")?.value;

    if (!privyToken) {
      return { user: null };
    }

    const privy = new PrivyClient(
      requestEvent.env.get("PUBLIC_PRIVY_APP_ID") || "",
      requestEvent.env.get("PRIVY_APP_SECRET") || "",
    );

    // return { user: DUMMY_USER };

    try {
      const { userId } = await privy.verifyAuthToken(privyToken || "");
      const user = await privy.getUserById(userId);
      console.log(">>", i++, "[loader] /routes/layout.tsx");
      return { user };
    } catch (e) {
      console.log("error", e);
      return { user: undefined };
    }
  },
);

// const DUMMY_USER: User = {
//   id: "did:privy:cmbhlm3ow000rky0mhr1kdzc7",
//   createdAt: new Date("2025-06-04T07:00:43.000Z"),
//   isGuest: false,
//   customMetadata: {},
//   linkedAccounts: [
//     {
//       id: null,
//       address: "0xAA25790C239B0Aa94A6A223B13C0b81D1E68942b",
//       type: "wallet",
//       verifiedAt: new Date("2025-06-04T07:00:43.000Z"),
//       firstVerifiedAt: new Date("2025-06-04T07:00:43.000Z"),
//       latestVerifiedAt: new Date("2025-07-23T17:13:04.000Z"),
//       chainType: "ethereum",
//       chainId: "eip155:8453",
//       walletType: undefined,
//       walletClientType: "metamask",
//       connectorType: "injected",
//       hdWalletIndex: undefined,
//       imported: undefined,
//       delegated: undefined,
//     },
//   ],
//   email: undefined,
//   phone: undefined,
//   wallet: {
//     id: null,
//     address: "0xAA25790C239B0Aa94A6A223B13C0b81D1E68942b",
//     verifiedAt: new Date("2025-06-04T07:00:43.000Z"),
//     firstVerifiedAt: new Date("2025-06-04T07:00:43.000Z"),
//     latestVerifiedAt: new Date("2025-07-23T17:13:04.000Z"),
//     chainType: "ethereum",
//     chainId: "eip155:8453",
//     walletType: undefined,
//     walletClientType: "metamask",
//     connectorType: "injected",
//     hdWalletIndex: undefined,
//     imported: undefined,
//     delegated: undefined,
//   },
//   smartWallet: undefined,
//   google: undefined,
//   twitter: undefined,
//   discord: undefined,
//   github: undefined,
//   apple: undefined,
//   linkedin: undefined,
//   tiktok: undefined,
//   spotify: undefined,
//   instagram: undefined,
//   custom: undefined,
//   farcaster: undefined,
//   telegram: undefined,
// };
