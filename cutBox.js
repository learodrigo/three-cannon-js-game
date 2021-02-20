export default cutBox = (topLayer, overlap, size, delta) => {
    const direction = topLayer.direction
    const newWidth = direction === 'x' ? overlap : topLayer.width
    const newDepth = direction === 'z' ? overlap : topLayer.depth

    // Update metadata
    topLayer.width = newWidth
    topLayer.depth = newDepth

    // Update Threejs model
    topLayer.threejs.scale[direction] = overlap / size
    topLayer.threejs.position[direction] -= delta / 2

    // Update Cannonjs model
    topLayer.cannonjs.position[direction] -= delta / 2

    // Replace shape to a smaller one
    const shape = new CANNON.Box(
        new CANNON.Vec3(newWidth / 2, boxHeight / 2, newDepth / 2)
    )
    topLayer.cannonjs.shapes = []
    topLayer.cannonjs.addShape(shape)
}
