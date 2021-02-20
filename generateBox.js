export default generateBox = (x, y, z, width, depth) => {
    // Threejs
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth)
    const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`)
    const material = new THREE.MeshLambertMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    screen.add(mesh)

    // Cannonjs
    const shape = new CANNON.Box(
        new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
    )
    let mass = falls ? 5 : 0
    const body = new CANNON.Body({ mass, shape })
    body.position.set(x, y, z)
    world.addBody(body)

    return {
        threejs: mesh,
        cannonjs: body,
        width,
        depth
    }
}
