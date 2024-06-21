import { useAccount } from "wagmi";
import { myNFTABI, myNFTAddress } from "@/ABIs/myNFT";
import { TransactButton } from "./TransactButton";
import { communityPoolABI, communityPoolAddress } from "@/ABIs/communityPool";

// example batch transaction, making two mint NFT calls
export function Transact() {
  const account = useAccount();

  return (
    <div>
      <h2>Transact</h2>
      <div>
        <TransactButton
          id="mint-button"
          contracts={[
            {
              address: communityPoolAddress,
              abi: communityPoolABI,
              functionName: "transferCommunityUSDC",
              args: [
                communityPoolAddress,
                100000n,
                "vote",
                "vote 1 cent towards contract",
              ],
            }
          ]}
          text="Mint"
        />
      </div>
    </div>
  );
}
