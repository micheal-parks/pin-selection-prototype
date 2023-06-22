<script lang="ts">

import '@viamrobotics/prime'
import { Canvas } from '@threlte/core'
import Scene from './components/scene.svelte'

</script>

<main class='px-4 py-16'>
  <article class="flex flex-col border-light w-full border">
    <header class="border-light flex items-center gap-4 border-b px-4 py-2">
      <h1>motor</h1>
      <v-breadcrumbs crumbs='motor,DMC4000'></v-breadcrumbs>
    </header>
    <div></div>
    <div class='relative flex flex-col grow'>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  </article>
</main>

