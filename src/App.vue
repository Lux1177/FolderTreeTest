<script lang="ts" setup>

import Modal from "./components/modal/Modal.vue";
import {ref} from "vue";

const isModalOpen = ref<boolean>(false)
const selectedFolder = ref<number | null>(null)

function toggleModal() {
	isModalOpen.value = !isModalOpen.value;
}

function getModalData(folderId: number | null) {
	isModalOpen.value = false
	selectedFolder.value = folderId
}

</script>

<template>

	<div class="h-screen w-full flex justify-center items-center">


		<div class="h-screen w-full flex flex-col justify-center items-center">

			<h1 v-if="!isModalOpen" class="mb-12">{{
					selectedFolder ? `Вы выбрали папку с идентификатором ${selectedFolder}` :
						"Вы пока не выбрали папку"
				}}</h1>

			<button v-if="!isModalOpen" class="bg-green-700 rounded-lg px-3 py-1.5 text-xl
		font-semibold hover:bg-green-800 transition-colors" @click="toggleModal">Открыть
			</button>

			<Modal v-if="isModalOpen" heading="First Modal" @close-modal="getModalData"/>

		</div>

	</div>

</template>

<style scoped>

</style>
