<template v-show="cart.length">
	<view class="cart">
		
	</view>
</template>

<script setup>
	import GoodModal from './GoodModal.vue';
	import { useCartStore } from '/stores/cart';
		import {storeToRefs} from 'pinia'
		const store= useCartStore() //购物车store
		const {cart} = storeToRefs(store)
		const {updateCart} = store
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';
	
	
</style>