<script lang='ts'>

import * as THREE from 'three'
import { T, type Props, type Events, type Slots, forwardEventHandlers, useFrame, useThrelte } from '@threlte/core'
import { useGltf, HTML } from '@threlte/extras'
import { Edges, interactivity } from '@threlte/extras'
import { onDestroy, onMount } from 'svelte'
import { view } from '../stores'

type $$Props = Props<THREE.Group>
type $$Events = Events<THREE.Group>
type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

export const ref = new THREE.Group()

type GLTFResult = {
  nodes: {
    Board: THREE.Mesh
    Pins_39_40: THREE.Mesh
    USB_30: THREE.Mesh
    Ethernet: THREE.Mesh
    CPU1: THREE.Mesh
    CPU2: THREE.Mesh
    CPU3: THREE.Mesh
    ChipPins1: THREE.Mesh
    SDRAM: THREE.Mesh
    ChipPins4: THREE.Mesh
    Chip11: THREE.Mesh
    DualBandWifi: THREE.Mesh
    ChipPins6: THREE.Mesh
    Pins001: THREE.Mesh
    CsiCameraPort: THREE.Mesh
    MicroHDMI1: THREE.Mesh
    MicroHDMI2: THREE.Mesh
    ChipPins8: THREE.Mesh
    USB_20: THREE.Mesh
    AudioPort: THREE.Mesh
    USB_C: THREE.Mesh
    ChipPins9: THREE.Mesh
    Pins_37_38: THREE.Mesh
    Pins_35_36: THREE.Mesh
    Pins_33_34: THREE.Mesh
    Pins_31_32: THREE.Mesh
    Pins_29_30: THREE.Mesh
    Pins_27_28: THREE.Mesh
    Pins_25_26: THREE.Mesh
    Pins_23_24: THREE.Mesh
    Pins_21_22: THREE.Mesh
    Pins_19_20: THREE.Mesh
    Pins_17_18: THREE.Mesh
    Pins_15_16: THREE.Mesh
    Pins_13_14: THREE.Mesh
    Pins_11_12: THREE.Mesh
    Pins_9_10: THREE.Mesh
    Pins_7_8: THREE.Mesh
    Pins_5_6: THREE.Mesh
    Pins_3_4: THREE.Mesh
    Pins_1_2: THREE.Mesh
    Pins021: THREE.Mesh
  }
  materials: {}
}

const meshes = [
  'Board',
  
  'USB_30',
  'Ethernet',
  'CPU1',
  'CPU2',
  'CPU3',
  'ChipPins1',
  'SDRAM',
  'ChipPins4',
  'Chip11',
  'DualBandWifi',
  'ChipPins6',
  'Pins001',
  'CsiCameraPort',
  'MicroHDMI1',
  'MicroHDMI2',
  'ChipPins8',
  'USB_20',
  'AudioPort',
  'USB_C',
  'ChipPins9',
  'Pins021',
] as const

const pins = [
  'Pins_39_40',
  'Pins_37_38',
  'Pins_35_36',
  'Pins_33_34',
  'Pins_31_32',
  'Pins_29_30',
  'Pins_27_28',
  'Pins_25_26',
  'Pins_23_24',
  'Pins_21_22',
  'Pins_19_20',
  'Pins_17_18',
  'Pins_15_16',
  'Pins_13_14',
  'Pins_11_12',
  'Pins_9_10',
  'Pins_7_8',
  'Pins_5_6',
  'Pins_3_4',
  'Pins_1_2',
] as const

interactivity({
  filter: (hits, _state) => {
    let results: THREE.Intersection[] = []

    for (let i = 0, l = hits.length, hit: THREE.Intersection; i < l; i += 1) {
      hit = hits[i]!
      if ((hit.object as THREE.LineSegments).isLineSegments) continue
      results.push(hit)
    }
    // Only return the first hit
    return results
  }
})

const gltf = useGltf<GLTFResult>('glb/pi.glb')

const component = forwardEventHandlers()

const targetPosition = new THREE.Vector3()
const hoverObject = new THREE.Object3D()

let selectedPinName = ''
let selected: THREE.Mesh | null = null

const assignments: Record<string, string> = {}

const formatPinName = (name: string) => {
  return name.replace('_', ' ').replace('_', ' / ')
}

const handleAssignment = (event: CustomEvent<{ value: string }>) => {
  assignments[selectedPinName] = event.detail.value
}

const COLOR_WHITE = new THREE.Color(0xffffff)
const COLOR_GREEN = new THREE.Color(0x42d46b)

const handleEnter = (event: THREE.Intersection) => {
  if (selected) {
    const material = selected.material as THREE.MeshStandardMaterial
    material.color.set(COLOR_WHITE)
  }

  selected = event.object as THREE.Mesh
  selectedPinName = formatPinName(selected.name)
  targetPosition.copy(selected.position)

  const material = selected.material as THREE.MeshStandardMaterial
  material.color.set(COLOR_GREEN)
}

const handleLeave = () => {
  if (selected) {
    const material = selected.material as THREE.MeshStandardMaterial
    material.color.set(COLOR_WHITE)
    selected = null
  }
}

useFrame(() => {
  hoverObject.position.lerp(targetPosition, 0.4)
})

const { renderer } = useThrelte()

onMount(() => {
  renderer?.domElement.parentElement?.addEventListener('pointerleave', handleLeave)
})

onDestroy(() => {
  renderer?.domElement.parentElement?.removeEventListener('pointerleave', handleLeave)
})

</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}

    {#each meshes as mesh (mesh)}
      <T is={gltf.nodes[mesh]}>
        <T.MeshBasicMaterial
          color={COLOR_WHITE}
          toneMapped={false}
        />
        <Edges
          color={new THREE.Color(0x777777)}
          thresholdAngle={20}
        />
      </T>
    {/each}

    {#each pins as pin (pin)}
      <T
        is={gltf.nodes[pin]}
        on:pointerover={handleEnter}
      >
        <T.MeshBasicMaterial
          color={assignments[formatPinName(pin)] ? COLOR_GREEN : COLOR_WHITE}
          toneMapped={false}
        />
        <Edges
          thresholdAngle={20}
          color='black'
        />

        {#if assignments[formatPinName(pin)]}
          <HTML center sprite>
            <div
              class='absolute -translate-x-[50%] translate-y-[23px] transition-opacity duration-300'
              class:opacity-0={$view === 'topdown'}
              class:opacity-100={$view === 'isometric'}
            >
              <div class='flex flex-col gap-2 bg-white py-1 px-2 min-w-max shadow-sm border border-black text-xs'>
                <h3 class='font-semibold'>{formatPinName(pin)}</h3>
                {assignments[formatPinName(pin)]}
                <div class='absolute bottom-full left-[50%] bg-black w-px bg-success h-6' />
              </div>
            </div>
          </HTML>
        {/if}
      </T>
    {/each}
    

    <T is={hoverObject}>
      <HTML center sprite>
        {#if selected}
          <div class='absolute -translate-x-[50%] translate-y-[23px]'>
            <div class='flex flex-col gap-2 bg-white py-2 px-3 min-w-max shadow-sm border border-medium text-xs'>
              <h3 class='font-semibold'>{selectedPinName}</h3>
              <div class='flex flex-col gap-2'>
                <v-radio
                  label='Assignment'
                  options='Direction,In1,In2,PWM,High,Low'
                  on:input={handleAssignment}
                />
              </div>
              <div class='absolute bottom-full left-[50%] w-px bg-gray-400 h-6' />
            </div>
            
          </div>
        {/if}
      </HTML>
    </T>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
