<script lang='ts'>

import * as THREE from 'three'
import { useThrelte } from '@threlte/core'
import Inspector from 'three-inspect'

const { scene, camera, renderer } = useThrelte()

let inspector: Inspector | undefined

$: {
  inspector?.dispose()
  inspector = new Inspector({
    THREE,
    scene,
    camera: camera.current as THREE.OrthographicCamera,
    renderer: renderer!
  })
}

</script>
