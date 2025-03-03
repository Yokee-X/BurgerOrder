<template>
	<button style="width: 100%;height: 100rpx;" @tap="show">出现弹窗</button>
	<popup ref="popRef" :test="test"></popup>
</template>

<script setup>
import { ref } from 'vue';
import popup from './popup.vue'
	const popRef = ref(null)
	const test = ref(null)
	const show=()=>{
		test.value=123
		popRef.value.open()
	}
</script>

<style>
</style>