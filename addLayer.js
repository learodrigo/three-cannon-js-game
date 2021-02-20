export default addLayer = (x, z, width, depth, direction) => {
    const y = boxHeight * stack.length

    const layer = generatorBox(x, y, z, width, depth)
    layer.direction = direction

    stack.push(layer)
}
