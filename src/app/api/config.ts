import { createClient, createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";

export const client = createPublicClient({
  chain: base,
  transport: http(),
});

const paymasterService = 'https://api.developer.coinbase.com/rpc/v1/base/NUHcNopP5aOENwuT1Ix2HWhV6qQM8WZy';


export const paymasterClient = createClient({
  chain: base,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));
