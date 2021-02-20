import cutBox from "./cutBox"

let gameStarted = false

window.addEventListener('click', () => {
    if (!gameStarted) {
        renderer.setAnimationLoop(animation)
        gameStarted = true
    }
    else {
        const topLayer = stack[stack.length - 1]
        const previousLayer = stack[stack.length - 2]

        const direction = topLayer.direction

        const delta =
            topLayer.threejs.position[direction] -
            previousLayer.threejs.position[direction]

        const overhangSize = Math.abs(delta)

        const size = direction === 'x' ? topLayer.width : topLayer.depth

        const overlap = size - overhangSize

        if (overlap > 0) {
            cutBox(topLayer, overlap, size, delta)

            // Overhanding
            const overhangingShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta)
            const overhangX =
                direction === 'x'
                    ? topLayer.threejs.position.x + overhangingShift
                    : topLayer.threejs.position.x

            const overhangZ =
                direction === 'z'
                    ? topLayer.position.z + overhangingShift
                    : topLayer.position.z

            const overhangWidth = direction === 'x' ? overhangSize : newWidth
            const overhangDepth = direction === 'z' ? overhangSize : newDepth

            addOverhanging(overhangX, overhangZ, overhangWidth, overhangDepth)

            // Next layer
            const nextX = direction === 'x' ? topLayer.threejs.position.x : -10
            const nextZ = direction === 'z' ? topLayer.threejs.position.z : -10
            const nextDirection = direction === 'x' ? 'z' : 'x'

            addLayer(nextX, nextZ, newWidth, newDepth, nextDirection)
        }
    }
})

const animation = () => {
    const speed = 0.15

    const topLayer = stack[stack.length - 1]
    topLayer.threejs.position[topLayer.direction] += speed
    topLayer.cannonjs.position[topLayer.direction] += speed

    if (camera.position.y < boxHeight * (stack.length - 2) + 4) {
        camera.position.y += speed
    }

    updatePhysics()
    renderer.render(scena, camera)
    lastTime = time
}

const updatePhysics = () => {
    world.step(1 / 60)

    // Copy coodinates from Cannonjs to Threejs
    overhangs.forEach(ele => {
        ele.threejs.position.copy(ele.cannonjs.position)
        ele.threejs.quaternion.copy(ele.cannonjs.quaternion)
    })
}
