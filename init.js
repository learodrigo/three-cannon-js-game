const boxHeight = 1
const originalBoxSize = 3

let camera, scene, renderer, world
let stack = []
let overhangs = []

export default init = () => {
    world = new CANNON.World()
    world.gravity.set(0, -10, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 40

    scene = new THREE.Scene()

    addLayer(0, 0, originalBoxSize, originalBoxSize)
    addLayer(-10, 0, originalBoxSize, originalBoxSize, 'x')

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(10, 20, 0)
    scene.add(directionalLight)

    const width = 10
    const height = width * (window.innerHeight / window.innerWidth)
    camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        100
    )

    camera.position.set(4, 4, 4)
    camera.lookAt(0, 0, 0)

    renderer = new THREE.WebGLRenderer({ antialiase: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    document.body.appendChild(renderer.domElement)
}
