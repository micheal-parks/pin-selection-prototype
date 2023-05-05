<script lang='ts'>

import { injectPlugin } from '@threlte/core'
import type { BufferGeometry, Mesh } from 'three'
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh'

injectPlugin('bvh-raycast', () => {
  return {
    onRefChange(ref) {
      if (ref.type === 'EdgesGeometry') return

      if ((ref as BufferGeometry).isBufferGeometry) {
        ref.computeBoundsTree = computeBoundsTree
        ref.disposeBoundsTree = disposeBoundsTree
        ref.computeBoundsTree()
        return () => ref.disposeBoundsTree()
      }

      if ((ref as Mesh).isMesh) {
        ref.raycast = acceleratedRaycast
      }

      return
    }
  }
})
</script>

<slot />