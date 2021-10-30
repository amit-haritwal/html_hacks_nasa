import { injected } from "./connectors";
import { useWeb3React } from "@web3-react/core";
import {Button} from '@mui/material';

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

  async function disconnectWallet() {
    try {
      await deactivate();
    } catch (ex) {
      console.error(ex);
    }
  }
  return (
    <>
      <Button variant="outlined" color={active?"success":"primary"} onClick={connectWallet} >
        {active ? `Connected to ${account}` : "Connect to MetaMask"}
      </Button>
      {active && <Button variant="contained" color="error" sx={{mx:1}} onClick={disconnectWallet}>Disconnect</Button>}
    </>
  );
}
export default MetaMaskConector;
