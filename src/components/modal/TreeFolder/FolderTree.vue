<script lang="ts" setup>
import {defineProps, ref} from 'vue'
import {IFolder} from "../folder.types.ts"

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
			<label :for="folder.name" class="flex cursor-pointer gap-0.5
				hover:bg-gray-100/5 px-2 rounded transition-colors items-center py-1" @click="sendData(folder.id)">
				<span v-show="folder.children.length"
				      class="inline-block"
				      @click="toggleChildren">{{ showChildren ? '<' : '>' }}</span>
				<span>{{ folder.name }}</span>
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