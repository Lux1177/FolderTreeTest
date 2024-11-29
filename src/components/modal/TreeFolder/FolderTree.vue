<script lang="ts" setup>
import {defineProps, ref} from 'vue'
import {IFolder} from "../folder.types.ts"
import {Icon} from '@iconify/vue'

defineProps<{
	data: IFolder[]
}>()

const showChildren = ref<boolean>(false)

const toggleChildren = (): void => {
	showChildren.value = !showChildren.value
}

const selectedChild = ref<number | null>(null)

const emit = defineEmits(['sendSelectedChildId'])

function sendData(id: number) {
	selectedChild.value = id
	emit('sendSelectedChildId', selectedChild.value)
}

</script>

<template>

	<div class="w-full">

		<div v-for="folder in data" :key="folder.id">
			<input :id="folder.name" v-model="selectedChild" :value="folder.id" class="hidden" name="folder" type="radio"/>
			<label :for="folder.name" class="flex cursor-pointer
				hover:bg-gray-100/5 px-2 rounded transition-colors items-center py-1" @click="sendData(folder.id)">
				<Icon v-show="folder.children.length" :icon="showChildren ? 'bx:up-arrow' : 'bx:right-arrow'"
				      class="inline-block"
				      @click="toggleChildren"/>
				{{ folder.name }}
			</label>
			<div v-if="folder.children.length" v-show="showChildren" class="ml-4">
				<FolderTree :data="folder.children" @send-selected-child-id="sendData"/>
			</div>
		</div>

	</div>

</template>

<style scoped>

input[type="radio"]:checked + label {
	@apply bg-gray-100/15;
}

</style>