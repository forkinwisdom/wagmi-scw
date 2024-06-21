import { useAccount, useGasPrice } from "wagmi";
import { useCapabilities } from "wagmi/experimental";
import { useEffect, useMemo, useState } from "react";
import { TransactButton } from "./TransactButton";
import { communityPoolAddress, communityPoolABI } from "../ABIs/communityPool";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { base } from "viem/chains";
import Web3 from "web3";


export function TransactWithPaymaster() {
  const account = useAccount();
  const [gasPrice, setGasPrice] = useState(10000n)


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

  useEffect(() => {
    async function fetchGasPrice() {
      const sdk = new CoinbaseWalletSDK({
        appName: 'ForkinWisdom',
        appLogoUrl: 'https://forkinwisdom.com/images/forkinwisdom.png',
        appChainIds: [base.id]
      })

      const provider = sdk.makeWeb3Provider()

      const web3 = new Web3(provider)


      const gasPrice = await web3.eth.getGasPrice()

      console.log("Gas Price: ", gasPrice)

      setGasPrice(gasPrice)
    }
    fetchGasPrice()
  }, [])

  return (
    <div>
      <h2>Transact With Paymaster</h2>
      <div>
        <TransactButton
          text="Mint"
          contracts={[
            {
              address: communityPoolAddress,
              abi: communityPoolABI,
              functionName: "assignCommunityUSDC",
              args: [
                "0xA7C6a8782632733d48246bF516475341Dac6d65B",
                10000n,
                "vote",
                "vote 1 cent towards contract",
              ],
            },
          ]}
          capabilities={capabilities}
        />
      </div>
    </div>
  );
}
