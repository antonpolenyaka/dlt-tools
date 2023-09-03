import { connect } from "./lib/connectWallet";
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
        const userAccount: string | undefined = await connect(this.chainData);
        console.debug("Web3Wallet userAccount", userAccount);
        if (userAccount !== undefined) {
          await this.initializeConnection(userAccount);
        }
      }
    } catch (exception) {
      console.error("Web3Wallet catched exception in reconnect", exception);
    }
    return this.isConnected;
  }

  async connect(): Promise<boolean> {
    try {
      this.isConnected = false;
      if (this.chainData !== undefined) {
        const userAccount: string | undefined = await connect(this.chainData);
        console.debug("Web3Wallet userAccount", userAccount);
        if (userAccount !== undefined) {
          await this.initializeConnection(userAccount);
        }
      }
    } catch (exception) {
      console.error("Web3Wallet catched exception in connect", exception);
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
