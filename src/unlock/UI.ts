import * as ui from '@dcl/ui-scene-utils'
import * as unlock from './Lock'
import * as events from "./events"

export class UnlockPurchaseUI {

    public lock: unlock.Lock
    public logoUrl: string
    public bodyText: string

    private purchasePrompt: ui.CustomPrompt
    private purchaseButton: ui.CustomPromptButton
    private loadingText: ui.CustomPromptText



    constructor(
        lock: unlock.Lock,
        logoUrl: string,
        bodyText: string,
    ) {
        this.logoUrl = logoUrl
        this.bodyText = bodyText
        this.lock = lock

        this.purchasePrompt = new ui.CustomPrompt(ui.PromptStyles.LIGHT, undefined, undefined, false)

        this.init()
    }

    /**
     * Initialise the prompt
     */
    private init = async () => {
        await this.populatePrompt()
        this.purchasePrompt.hide()
    }

    /**
     * Restores the prompt to default state and hides it
     */
    private resetAndHidePrompt = async () => {
        this.purchaseButton.show()
        this.loadingText.hide()
        this.purchasePrompt.hide()
    }

    /**
     * Hides the purchase button and shows loading text
     */
    private showLoadingText = async () => {
        this.purchaseButton.hide()
        this.loadingText.show()
    }

    /**
     * Populates the prompt with content
     */
    private populatePrompt = async () => {
        this.purchasePrompt.addIcon(this.logoUrl, 0, 120, 200, 43);
        this.purchasePrompt.addText(this.bodyText, 0, 30, new Color4(0.5, 0.5, 0.5, 1), 13)
        this.purchasePrompt.addText('Powered by nganen', 0, -120, new Color4(0.5, 0.5, 0.5, 1), 10)

        this.loadingText = this.purchasePrompt.addText('Loading...', 0, -75, new Color4(0.75, 0.75, 0.75, 1), 12)
        this.loadingText.hide()
        this.purchaseButton = this.purchasePrompt.addButton(
            'Cancel',
            -100,
            -50,
             () => {
                this.hide()
            },
            ui.ButtonStyles.F,
        )
        this.purchaseButton = this.purchasePrompt.addButton(
            'Buy NFT',
            100,
            -50,
            async () => {
                openExternalURL("https://ngagen.com/spartanpoker")
            },
            ui.ButtonStyles.E
        )
        this.purchaseButton = this.purchasePrompt.addButton(
            'Retry',
            -0,
            -100,
             () => {
                this.lock.getHasNFTs()
            },
            ui.ButtonStyles.DARK,
        )
    }

    /**
     * Show the prompt
     */
    public show = async () => {
        this.purchasePrompt.show()
    }

    /**
     * Hide the prompt
     */
    public hide = async () => {
        this.purchasePrompt.hide()
    }
}

