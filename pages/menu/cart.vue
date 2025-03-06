<template >
	<view class="cart">
		
	</view>
</template>

<script setup>
	import GoodModal from './GoodModal.vue';
	import { useCartStore } from '/stores/cart';
		import {storeToRefs} from 'pinia'
		const store= useCartStore() //购物车store
		const {cart} = storeToRefs(store)
		console.log(cart.value.length,'cart')
		const {updateCart} = store
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';
	.cart{
		position: fixed;
		width: 700rpx;
		background: #fff;
		height: 100rpx;
		bottom: 20rpx;
		z-index: 90;
		left: 25rpx;
		border-radius: 100rpx;
		overflow: hidden;
	}
	
	
</style>