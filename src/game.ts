import { buildScene } from './builderContent'
import Door from "./components/door"
import VideoPlayer from "./components/videoplayer"
import * as unlock from "./unlock/index"

buildScene()

const lock = new unlock.Lock("0x9553D3110EbFF897995ee49ddCc359580180491b");
const NEXT_PUBLIC_GCP_STORAGE_URL="https://storage.ngagen.com"


const videos = [{
  url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
  pos:{
    position: new Vector3(8, 1, 8),
  }
},{}]
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

door.addComponent(
  new OnPointerDown(() => {
  if (door.isOpen) {
    door.toggle(false)
  }else if(lock.validUser){
    door.toggle(true)
  }
  },
    {
      button: ActionButton.POINTER,
      showFeedback: true,
      hoverText: "Unlock Door",
    }
  )
)

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

// const player1 = new VideoPlayer("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",{
//   position: new Vector3(20, 1, 8),
//   scale: new Vector3(2, 2, 2),
// });

//   player1.addComponent(
//   new OnPointerDown(() => {
//     player1.toggle()
//   },
//     {
//       button: ActionButton.POINTER,
//       showFeedback: true,
//       hoverText: "Pause/Play",
//     }
//   )
// )