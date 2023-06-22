<script lang='ts'>

import { T } from '@threlte/core'
import { tweened } from 'svelte/motion'
import { cubicInOut } from 'svelte/easing'
import { useThrelte } from '@threlte/core'
import { onMount, onDestroy } from 'svelte'
import { view } from '../stores'

const topdown = {
  py: 1,
  rx: -Math.PI / 2,
  ry: 0
} as const

const isometric = {
  py: 0,
  rx: -Math.PI / 4,
  ry: Math.atan(-1 / Math.sqrt(2)),
} as const

const config = { duration: 400, easing: cubicInOut }
const positionY = tweened<number>(isometric.py, config)
const rotationY = tweened<number>(isometric.ry, config)
const rotationX = tweened<number>(isometric.rx, config)

const setIsometric = () => {
  view.set('isometric')
  positionY.set(isometric.py)
  rotationY.set(isometric.ry)
  rotationX.set(isometric.rx)
}

const setTopdown = () => {
  view.set('topdown')
  positionY.set(topdown.py)
  rotationY.set(topdown.ry)
  rotationX.set(topdown.rx)
}

document.addEventListener('keydown', (e) => e.key === 'i' && setIsometric())
document.addEventListener('keydown', (e) => e.key === 't' && setTopdown())

const { renderer } = useThrelte()

onMount(() => {
  renderer?.domElement.parentElement?.addEventListener('pointerenter', setTopdown)
  renderer?.domElement.parentElement?.addEventListener('pointerleave', setIsometric)
})

onDestroy(() => {
  renderer?.domElement.parentElement?.removeEventListener('pointerenter', setTopdown)
  renderer?.domElement.parentElement?.removeEventListener('pointerleave', setIsometric)
})

</script>

<T.OrthographicCamera
  makeDefault
  position.y={$positionY}
  rotation.order='YXZ'
  rotation.y={$rotationY}
  rotation.x={$rotationX}
  zoom={120}
  near={-5}
  far={5}
/>
