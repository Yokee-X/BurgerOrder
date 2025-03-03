<template>
	<view>
		<SButton @tap="show(123)">选规格</SButton>
		<popup ref="goodModalRef" @change="get" :test="test"></popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import popup from './popup.vue'
	const goodModalRef = ref(null)
	const test = ref(null)
	const show=(value)=>{
		test.value=value
		goodModalRef.value.open()
	}
	const get=(visible)=>{
		console.log('父级get',visible)
	}
</script>

<style>
</style>