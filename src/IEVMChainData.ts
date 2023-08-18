import INativeCurrency from "./INativeCurrency";

export default interface IEVMChainData {
    chainId: string, // Example: '0x1'
    chainName: string, // Example: 'Ethereum Mainnet'
    nativeCurrency: INativeCurrency, // Example: { name: 'ETH', symbol: 'ETH', decimals: 18 }
    rpcUrls: string, // Example: 'https://eth.llamarpc.com/'
    blockExplorerUrls: string, // Example: 'https://etherscan.io'
}