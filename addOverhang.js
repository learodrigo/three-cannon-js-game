export default addOverhang = (x, z, width, depth) => {
    const y = boxHeight * (stack.length - 1)
    const overhang = generateBox(x, y, z, width, depth)
    overhangs.push(overhang)
}
