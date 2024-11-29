<script lang="ts" setup>
import {defineProps, ref} from "vue";
import FolderTree from "./TreeFolder/FolderTree.vue";
import {IFolder} from "./folder.types.ts";

defineProps<{
	heading: string;
}>()

const emit = defineEmits(['closeModal'])

const selectedFolder = ref<number | null>(null)

function sendModalData(close: boolean) {
	if (close) {
		emit("closeModal", null)
	}
	else {
		emit("closeModal", selectedFolder.value)
	}
}

const mockFolders: IFolder[] = [
	{
		id: 1, name: 'Папка 1', children: [
			{id: 2, name: 'Папка 1.1', children: []},
			{
				id: 3, name: 'Папка 1.2', children: [
					{id: 4, name: 'Папка 1.2.1', children: []}
				]
			}
		]
	},
	{id: 5, name: 'Папка 2', children: []},
];

function receiveChildren(children: number) {
	selectedFolder.value = children
}

</script>

<template>

	<transition>
		<div class="absolute h-screen w-screen flex justify-center items-center bg-black/20">
			<div class="relative h-2/3 bg-black/30 w-1/3 mb-12 rounded-lg p-3">
				<div class="w-full pt-6 px-16 mb-8">
					<h2 class="text-center text-2xl font-semibold">{{ heading }}</h2>
					<button class="absolute top-2 right-2 bg-red-700 px-1.5 py-0.5 rounded-lg
				hover:bg-red-800 transition-colors" @click="sendModalData(true)">Закрыть
					</button>
				</div>

				<FolderTree :data="mockFolders" @send-selected-child-id="receiveChildren"/>

				<button class="absolute right-2 bottom-2 bg-green-700 px-3 py-0.5
					rounded-lg hover:bg-green-800 transition-colors" @click="sendModalData(false)">Oк
				</button>
			</div>
		</div>
	</transition>


</template>

<style scoped>

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

</style>
