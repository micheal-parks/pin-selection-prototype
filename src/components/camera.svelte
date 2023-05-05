<script lang='ts'>

import { T } from '@threlte/core'
import { tweened } from 'svelte/motion'
import { cubicInOut } from 'svelte/easing'

const config = { duration: 400, easing: cubicInOut }
const position = tweened(1, config)
const rotationY = tweened(0, config)
const rotationX = tweened(-Math.PI / 2, config)

const setIsometric = () => {
  position.set(0)
  rotationY.set(-Math.PI / 4)
  rotationX.set( Math.atan(-1 / Math.sqrt(2)))
}

const setTopDown = () => {
  position.set(1)
  rotationY.set(0)
  rotationX.set(-Math.PI / 2)
}

document.addEventListener('keydown', (e) => e.key === 'i' && setIsometric())
document.addEventListener('keydown', (e) => e.key === 't' && setTopDown())

</script>

<T.OrthographicCamera
  makeDefault
  position.y={$position}
  rotation.order='YXZ'
  rotation.y={$rotationY}
  rotation.x={$rotationX}
  zoom={250}
  near={-5}
  far={5}
/>
