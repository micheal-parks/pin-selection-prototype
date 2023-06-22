import { writable } from 'svelte/store'

export const view = writable<'isometric' | 'topdown'>('isometric')
