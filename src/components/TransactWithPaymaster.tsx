import { useAccount, useGasPrice } from "wagmi";
import { useCapabilities } from "wagmi/experimental";
import { useMemo } from "react";
import { TransactButton } from "./TransactButton";
import { communityPoolAddress, communityPoolABI } from "../ABIs/communityPool";

export function TransactWithPaymaster() {
  const account = useAccount()
  const {data: gasPrice, error} = useGasPrice()
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: `${window.location.origin}/api/paymaster`,
        },
      };
    }
  }, [availableCapabilities, account.chainId]);
  
  const contractData = useMemo(() => ({
    address: communityPoolAddress,
    abi: communityPoolABI,
    functionName: "transferCommunityUSDC",
    args: [communityPoolAddress, 10000n, "vote", "vote 1 cent towards contract"],
    gasPrice
  }), [gasPrice]);

  console.log(contractData);

  return (
    <div>
      <h2>Transact With Paymaster</h2>
      <div>
        <TransactButton
          text="Mint"
          contracts={[contractData]}
          capabilities={capabilities}
        />
      </div>
    </div>
  );
}
