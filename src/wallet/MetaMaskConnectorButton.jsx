import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";

function MetaMaskConector() {
  const { activate, active, library, connector, deactivate, account } =
    useWeb3React();
  async function connectWallet() {
    try {
      await activate(injected);
    } catch (exeption) {
      console.error(exeption);
    }
  }
  return (
    <button onClick={connectWallet}>
      {active ? `Connected to ${account}` : "Connect to MetaMask"}
    </button>
  );
}
export default MetaMaskConector;
