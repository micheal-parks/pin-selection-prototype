<script lang='ts'>

import Lights from './lights.svelte'
import Camera from './camera.svelte'
import Pi from './pi.svelte'
import Debug from './debug.svelte'
import Stats from './stats.svelte'
import Bvh from '../plugins/bvh.svelte'

</script>

<Lights />
<Camera />

<Bvh>
  <Pi />
</Bvh>

<Stats />

{#if false}
  <Debug />
{/if}
