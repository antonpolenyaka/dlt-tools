import { connect, reconnect } from "./lib/connectWallet";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import EventEmitter from "events";
import IEVMChainData from "./IEVMChainData";
import { toShortAddress } from "./blockchain/blockchainUtils";

class Web3Wallet {
  isConnected: boolean;
  address: string | undefined;
  shortAddress: string | undefined;
  provider: BrowserProvider | undefined;
  eventEmitter: EventEmitter;
  signer: JsonRpcSigner | undefined;
  chainData: IEVMChainData | undefined;

  constructor(chainData_: IEVMChainData) {
    this.isConnected = false;
    this.address = undefined;
    this.shortAddress = undefined;
    this.provider = undefined;
    this.eventEmitter = new EventEmitter();
    this.signer = undefined;
    this.chainData = chainData_;
  }

  async initializeConnection(userAccount: string) {
    console.debug("Set isConnected to true");
    this.isConnected = true;
    this.address = userAccount;
    this.shortAddress = toShortAddress(userAccount);
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.eventEmitter.emit(
      "onConnectedChanged",
      this.isConnected,
      this.address,
      this.shortAddress
    );

    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (accounts[0] === undefined) {
        this.disconnect();
      } else {
        this.address = accounts[0];
        this.shortAddress = toShortAddress(accounts[0]);
        this.eventEmitter.emit(
          "onAddressChanged",
          this.isConnected,
          this.address,
          this.shortAddress
        );
      }
    });
  }

  async reconnect(): Promise<boolean> {
    try {
      this.isConnected = false;
      if (this.chainData !== undefined) {
        // Check if is metamask and UI is unlocked (if is locked, we don't have any account connected)
        let isUnlocked: boolean = true;
        let providerIsConnected: boolean = false;
        if (window.ethereum) {
          providerIsConnected = window.ethereum.isConnected();
          if (window.ethereum._metamask) {
            isUnlocked = await window.ethereum._metamask.isUnlocked();
          }
        }
        // Check if is locked, we don't try to do anything to reconnect
        if (isUnlocked === true && providerIsConnected === true) {
          // Case if we have unlocked web3 wallet and connect to provider
          const userAccount: string | undefined = await reconnect(
            this.chainData
          );
          console.debug("Web3Wallet userAccount", userAccount);
          if (userAccount !== undefined) {
            await this.initializeConnection(userAccount);
          }
        }
      }
    } catch (exception) {
      console.error("Web3Wallet catched exception in reconnect", exception);
    }
    return this.isConnected;
  }

  async connect(): Promise<boolean> {
    try {
      console.debug("Web3Wallet connect start");
      this.isConnected = false;
      if (this.chainData !== undefined) {
        const userAccount: string | undefined = await connect(this.chainData);
        console.debug("Web3Wallet userAccount", userAccount);
        if (userAccount !== undefined) {
          await this.initializeConnection(userAccount);
        } else {
          console.error("Web3Wallet userAccount is undefined");
        }
      } else {
        console.error("Web3Wallet chainData is undefined");
      }
    } catch (exception) {
      console.error("Web3Wallet catched exception in connect", exception);
    } finally {
      console.debug("Web3Wallet connect end");
    }
    return this.isConnected;
  }

  disconnect(): boolean {
    this.address = undefined;
    this.shortAddress = undefined;
    this.isConnected = false;
    this.provider = undefined;
    this.eventEmitter.emit(
      "onConnectedChanged",
      this.isConnected,
      this.address,
      this.shortAddress
    );
    return this.isConnected;
  }
}

export default Web3Wallet;
