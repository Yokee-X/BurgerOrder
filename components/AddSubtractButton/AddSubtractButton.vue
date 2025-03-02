<template>
	<view class="btn-container flex items-center justify-between ">
		<view class="sub btn " :class="{disabled:total==props.minNumber}"  :style="{visibility:total ?  'visible':'hidden'}" @click="subtract">
			<text class="iconfont icon-reduce"></text>
		</view>
		<view class="number" :style="{visibility:total ?  'visible':'hidden'}">{{total}}
		</view>
		<view class="add btn" @click="add">
			<text class="iconfont icon-add"></text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const props = defineProps({
		init:{
			type:Number,
			default:0
		},
		minNumber: {
			type: Number,
			default: 0
		},
		maxNumber: {
			type: Number,
			default: 99
		},
		showReduce:{
			type:Boolean,
			default:false
		}
	})
	const total = ref(props.init)
	const $emit = defineEmits(['add', 'reduce'])
	const subtract = () => {
		if (total.value > props.minNumber) {
			total.value -= 1
		}
		$emit('reduce', total.value)
	}
	const add = () => {
		if (total.value < props.maxNumber) {
			total.value += 1
		}
		console.log('add',total.value)
		$emit('add', total.value)
	}
</script>

<style scoped lang="scss">
	@import '../../style/iconfont.css';
	@import '../../style/common.scss';

	.btn-container {
		width: 140rpx;
		// box-sizing: border-box;
	}

	.btn {
		width: 40rpx;
		height: 40rpx;
		font-weight: bold;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
	}

	.number {
		margin: 0 spacing-size(2);
	}

	.add {
		color: $text-primary ;
		background: $dark-gold;

	}

	.sub {
		border: 1px solid $dark-gold;
		color: $dark-gold;
	}
	.disabled{
		opacity: 0.5;
	}
</style>