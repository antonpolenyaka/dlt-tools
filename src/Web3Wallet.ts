import { connect } from "./lib/connectWallet";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";
import EventEmitter from "events";
import IEVMChainData from "./IEVMChainData";
import { toShortAddress } from "./blockchain/blockchainUtils";

export default class Web3Wallet {
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

  async reconnect(): Promise<boolean> {
    try {
      this.isConnected = false;
      if (this.chainData !== undefined) {
        const userAccount: string | undefined = await connect(this.chainData);
        console.log("reconnect userAccount", userAccount);
        if (userAccount !== undefined) {
          this.isConnected = true;
          this.address = userAccount;
          this.shortAddress = toShortAddress(userAccount);
          this.isConnected = true;
          this.provider = new ethers.BrowserProvider(window.ethereum);
          this.signer = await this.provider.getSigner();
          this.eventEmitter.emit(
            "onConnectedChanged",
            this.isConnected,
            this.address,
            this.shortAddress
          );
          // Detect if wallet is changed
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
      }
    } catch (exception) {
      console.error("Web3Wallet catched exception", exception);
    }
    return this.isConnected;
  }

  async connect(): Promise<boolean> {
    try {
      if (this.chainData === undefined) {
        return this.isConnected;
      }

      const userAccount: string | undefined = await connect(this.chainData);
      if (userAccount === undefined) {
        return this.isConnected;
      }

      this.address = userAccount;
      this.shortAddress = toShortAddress(userAccount);
      this.isConnected = true;
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.eventEmitter.emit(
        "onConnectedChanged",
        this.isConnected,
        this.address,
        this.shortAddress
      );
      // Detect if wallet is changed
      window.ethereum.on("accountsChanged", (accounts: any) => {
        // Time to reload your interface with accounts[0]!
        console.log(
          "Account in web3 wallet is changed to " + accounts,
          1,
          typeof accounts
        );
        console.log(
          "Account in web3 wallet is changed to " + accounts[0],
          2,
          typeof accounts[0]
        );
        if (accounts[0] === undefined) {
          this.disconnect();
        } else {
          this.address = accounts[0];
          this.shortAddress =
            accounts[0].substring(0, 5) + "..." + accounts[0].slice(-4);
          this.eventEmitter.emit(
            "onAddressChanged",
            this.isConnected,
            this.address,
            this.shortAddress
          );
        }
      });
    } catch (exception) {
      console.error("catched exception", exception);
    }
    return this.isConnected;
  }

  setAddress() {}

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
