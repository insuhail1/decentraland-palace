let myVideoClip :VideoClip
let myVideoTexture: VideoTexture
let myMaterial : Material

export default class Door extends Entity {
  constructor(
    url: string,
    pos: TranformConstructorArgs,
  ) {
    super()
    this.addComponent(new PlaneShape())
    this.addComponent(new Transform(pos))
    engine.addEntity(this)
    myVideoClip = new VideoClip(url)
    myVideoTexture = new VideoTexture(myVideoClip)

    myMaterial = new Material()
    myMaterial.albedoTexture = myVideoTexture
    myMaterial.roughness = 1
    myMaterial.specularIntensity = 0
    myMaterial.metallic = 0
    myMaterial.emissiveTexture = myVideoTexture
    myMaterial.emissiveColor = Color3.White()
    myMaterial.emissiveIntensity = 0.6
    this.addComponent(myMaterial)

    myVideoTexture.play()
  }

  toggle() {
      myVideoTexture.playing = !myVideoTexture.playing
  }
}
