import { getUserAccount } from '@decentraland/EthereumController'
import * as events from "./events"
import * as ethConnect from "eth-connect"
import * as web3Provider from '@decentraland/web3-provider'

import unlockABI from '../abis/unlock'

const ZERO: string = "0x0000000000000000000000000000000000000000";

let provider: web3Provider.Provider
let requestManager: ethConnect.RequestManager
let factory: ethConnect.ContractFactory
let address: string

/** Class representing a lock. */
export class Lock {
    public validUser: Boolean = false
    readonly lockAddress: string
    private contract: any

    private erc20Contract: any

    private tokenAddress: string = ""

    constructor(
        lockAddress: string
    ) {
        this.lockAddress = lockAddress
        this.init()
    }

    /**
     * Initialises the lock
     */
    private init = async () => {
        address = await getUserAccount()
        provider = await web3Provider.getProvider()
        requestManager = new ethConnect.RequestManager(provider)
        factory = new ethConnect.ContractFactory(requestManager, unlockABI)
        this.contract =(await factory.at(this.lockAddress)) as any;

        const balance = await this.contract.balanceOf(address,1)
        
        this.validUser = balance > 0
        }

  
    /**
     * Check if the user has a valid key
     * @returns { boolean } - is key valid
     */
    public getHasValidKey = () => {
        return this.validUser
    }

    /**
     * Gets the token symbol
     * @returns { string } - the token symbol 
     */
    public getSymbol = async () => {
        let symbol = "ETH"
        if (this.tokenAddress != ZERO) {
            try {
                symbol = await this.erc20Contract.symbol()
            } catch (e) {
                symbol = ""
                throw new Error("Some ERC20 contracts, including DAI do not have the right symbol method.")
            }
        }
        return symbol
    }


}

