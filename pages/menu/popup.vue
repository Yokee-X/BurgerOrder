<template>
	<uni-popup ref="popupRef" type="bottom">
		<view style="background: #fff;height: 50vh;width:100%">
			neirong12312++++++{{props.test}}
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';

	const popupRef = ref(null)
	const props = defineProps(['test'])
	onMounted(()=>{
		console.log(popupRef.value,'1111111111111')
	})
	const open = () => {
		popupRef.value.open()
	}


	defineExpose({
		open
	})
</script>

<style>
</style>