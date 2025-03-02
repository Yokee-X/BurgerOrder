<template>
	<view>
		<image class="poster" mode="widthFix" src="/static/poster/poster3.png"></image>
		<view class="button-container">
			<s-button @tap="jump(0)">
				<view class="button-text">
					<text class="button-text-main">店内堂食</text>
					<text class="button-text-sub">EAT-IN</text>
				</view>
			</s-button>
			<s-button @tap="jump(1)">
				<view class="button-text">
					<text class="button-text-main">打包外带</text>
					<text class="button-text-sub">TAKE-OUT</text>
				</view>
			</s-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'
	const jump=(p)=>{
		uni.switchTab({
			url:'/pages/menu/index?takeout='+p
		})
	}
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';
	.poster {
		width: 100vw;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.button-container {
		position: absolute;
		bottom: 200rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;

		.button-text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&-main {
				font-size: map-get($map: $font-sizes, $key: md);
			}

			&-sub {
				font-size: map-get($map: $font-sizes, $key: sm);
			}
		}
	}
</style>