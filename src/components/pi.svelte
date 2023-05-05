<script lang='ts'>

import * as THREE from 'three'
import { Group } from 'three'
import { T, type Props, type Events, type Slots, forwardEventHandlers, useFrame } from '@threlte/core'
import { useGltf, HTML } from '@threlte/extras'
import { Edges, interactivity } from '@threlte/extras'
import config from '../../tailwind.config'

const theme = config.theme

type $$Props = Props<THREE.Group>
type $$Events = Events<THREE.Group>
type $$Slots = Slots<THREE.Group> & { fallback: {}; error: { error: any } }

export const ref = new Group()

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

let hoveredPin = ''
let selected: THREE.Mesh

const handleEnter = (event) => {
  if (event.object.name === '') {
    console.log(event.object.name, event.object)
  }


  if (selected) {
    const material = selected.material as THREE.MeshStandardMaterial
    material.color.set(0xffffff)
  }

  selected = event.object as THREE.Mesh
  hoveredPin = selected.name.replace('_', ' ').replace('_', '/')
  targetPosition.copy(selected.position)

  const material = selected.material as THREE.MeshStandardMaterial
  material.color.set(0x42d46b)
}

useFrame((_, delta) => {
  hoverObject.position.lerp(targetPosition, 0.4)
})

</script>

<T is={ref} dispose={false} {...$$restProps} bind:this={$component}>
  {#await gltf}
    <slot name="fallback" />
  {:then gltf}

    {#each meshes as mesh (mesh)}
      <T is={gltf.nodes[mesh]}>
        <T.MeshBasicMaterial
          color='white'
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
          color='white'
          toneMapped={false}
        />
        <Edges
          thresholdAngle={20}
          color='black'
        />
      </T>
    {/each}
    

    <T is={hoverObject}>
      <HTML center>
        {#if hoveredPin}
          <div class='relative bg-white py-2 px-3 -mt-[5.5rem] min-w-max shadow-sm border border-medium'>
            {hoveredPin}
            <div class='absolute top-full left-[50%] w-px bg-gray-400 h-6' />
          </div>
        {/if}
      </HTML>
    </T>
  {:catch error}
    <slot name="error" {error} />
  {/await}

  <slot {ref} />
</T>
