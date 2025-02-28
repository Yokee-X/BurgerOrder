<template>
	<uni-popup ref="goodModal" type="bottom" border-radius="10px 10px 0 0" background-color="#fff" @change="({show})=>$emit('change',show)">
		<view>
			<scroll-view scroll-y="true"  class="flex column good items-center" >
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<image src="/static/home/foodshow.png" class="good-img"></image>
			<view class="flex justify-between">
				<text class="good-label">{{props.good?.label}}</text>
			</view>
			</scroll-view>
			<view class="bottom flex justify-around p-2">
				<s-button @tap="tap" class="p-3" style="width:40%">立即购买</s-button>
				<s-button @tap="tap" class="p-3" style="width:40%" primary>加入购物车</s-button>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref
	} from 'vue';
 const props =	defineProps({
	 good:{
		 type:Object,
		 default:()=>({})
	 }
 })
 console.log(props.good,'propsorpsr')
	const goodModal = ref(null)
	 const open = (direction) => {
	      goodModal.value?.open(direction); // 通过ref调用组件内的方法
	  };
	const tap=()=>console.log('tap')
	defineExpose({
		open
	})
	
	
</script>

<style scoped lang="scss">
	.good{
		height: 90vh;
		&-img{
			
		}
	}
	.bottom{
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		z-index: 10;
		bottom: 0;
		height: 160rpx;
		background: #fff;
	}
</style>