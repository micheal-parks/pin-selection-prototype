<script lang='ts'>

import Stats from 'three/examples/jsm/libs/stats.module'
import { useFrame } from '@threlte/core'

const stats = new Stats()
document.body.append(stats.dom)

useFrame(() => stats.update())

</script>
