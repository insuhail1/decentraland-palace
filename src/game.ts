import { buildScene } from './builderContent'
import Door from "./components/door"
import VideoPlayer from "./components/videoplayer"
import * as unlock from "./unlock/index"

import "./components/gnark"

buildScene()

export let sceneMessageBus = new MessageBus()

 new unlock.Lock("0x9553D3110EbFF897995ee49ddCc359580180491b");

const door = new Door(
  new GLTFShape('ed36149f-76c5-45c4-a678-d4b31c4ed9ca/models/Door_Fantasy.glb'),
  {
    position: new Vector3(32.5, 0, 38),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1),
  },
  'Open',
  'Close'
)
// Lock initialised
unlock.eventManager.addListener(unlock.LockInitialised, "unlockInit", ({ lock, authorised  }) => {

  log('authorised: ' , authorised)
  if (authorised) {
    // already owns NFTs so open the door
    sceneMessageBus.emit('openDoor', {})
  } else {
    // doesn't own NFTs?

    // Instantiate Unlock UI object
    const unlockPurchaseUI = new unlock.UnlockPurchaseUI(
      lock,
      'data:image/jpeg;base64,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',
      'This is VIP section, to enter Please purchase our NFTs'
    )

    // Show UI when cube is clicked
    door.addComponent(
      new OnPointerDown(() => {
        unlockPurchaseUI.show()
      },
        {
          button: ActionButton.ANY,
          showFeedback: true,
          hoverText: "Unlock Door",
        }
      )
    )

  }
})

unlock.eventManager.addListener(unlock.Retry, null, ({ lock, authorised  }) => {

  log('authorised: ' , authorised)
  if (authorised) {
    // already owns NFTs so open the door
    sceneMessageBus.emit('openDoor', {})
  } 
})

const NEXT_PUBLIC_GCP_STORAGE_URL="https://storage.ngagen.com"


const videos = [{
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
  pos:{
    position: new Vector3(8, 1, 8),
  }
},{}]

const player = new VideoPlayer("https://storage.ngagen.com/61fb63979e18210019bcc140/(1643896686)-a1d4038f-3e0b-4bd9-8fae-b54bfd71fbdb.mp4",{
  position: new Vector3(8, 1, 8),
  scale: new Vector3(2, 2, 2),
});

  player.addComponent(
  new OnPointerDown(() => {
    player.toggle()
  },
    {
      button: ActionButton.POINTER,
      showFeedback: true,
      hoverText: "Pause/Play",
    }
  )
)

// --- Door Messages ---

sceneMessageBus.on('openDoor', ({ sender }) => {
  if (!door.isOpen) {
    door.toggle(true)
  }
})
sceneMessageBus.on('closeDoor', ({ sender }) => {
  if (door.isOpen) {
    door.toggle(false)
  }
})
