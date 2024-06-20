import { paymasterClient } from "../config";
import { willSponsor } from "../utils";

export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;

  console.log("Sponsorship Proxy: ", method, req.params);

  if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    console.log("Not a sponsorable operation");
    return Response.json({ error: "Not a sponsorable operation" });
  }

  if (method === "pm_getPaymasterStubData") {
    console.log("Getting paymaster stub data");
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    console.log("Getting paymaster data");
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    return Response.json({ result });
  }
  console.log("Method not found");
  return Response.json({ error: "Method not found" });
}
