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
    public userHasNFTs: Boolean = false
    readonly lockAddress: string
    private contract: any
    public initialized: Boolean = false

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
        log("-------- init")
        address = await getUserAccount()
        provider = await web3Provider.getProvider()
        requestManager = new ethConnect.RequestManager(provider)
        factory = new ethConnect.ContractFactory(requestManager, unlockABI)
        this.contract =(await factory.at(this.lockAddress)) as any;
        await this.getHasNFTs()
        }

   
        public getHasNFTs =async () => {
            const balance = await this.contract.balanceOf(address,1)
            this.userHasNFTs = balance > 0
            let authorised = this.userHasNFTs
            if(this.initialized ){
            events.eventManager.fireEvent(new events.Retry(this, authorised))
            }
            else{
            events.eventManager.fireEvent(new events.LockInitialised(this, authorised))
            this.initialized = true
            } 
        }


}

