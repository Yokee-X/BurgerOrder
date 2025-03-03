<template>
	<uni-popup ref="popupRef" type="bottom" @change="modalChange">
		<view class="container">
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
		console.log('调用open',popupRef.value)
		popupRef.value.open()
	}
	defineExpose({
		open
	})
	
	const $emit = defineEmits(['change'])
	const modalChange = (visible) => {
		$emit('change', visible)
	}
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';
	.container {
		position: relative;
		height: 90vh;
		box-sizing: border-box;
		border-radius: 10px 10px 0 0;
		background: #fff;
	}
	
	.close {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		background: rgba(0, 0, 0, 0.1);
		color: #fff;
	
	}
	
	.good {
		position: relative;
		overflow-y: auto;
		padding-bottom: 160rpx;
	
		&-img {
			// display: block;
			width: 600rpx;
			// height: 100%;
		}
	
		&-main {
			width: 700rpx;
			box-sizing: border-box;
			border-bottom: 1px solid $border-base;
			padding: spacing-size(4) 0;
		}
	
		&-label {
			font-weight: 500;
		}
	
		&-sell {
			color: $light-gray;
		}
	
		.add {
			width: 700rpx;
	
			&-title {
				font-weight: 500;
				padding: spacing-size(3) 0;
			}
	
			&-item {
				// box-sizing: border-box;
				padding: spacing-size(2) spacing-size(3);
	
				&:not(last-child) {
					margin-bottom: spacing-size(4);
				}
	
				background: #eee;
				@include radius-size(base);
				line-height: 40rpx;
	
				&-label {
					color: $dark-gold;
				}
	
				&-price {
					color: $dark-gold;
					margin: 0 150rpx 0 auto;
				}
	
				&-number {
					margin: 0 spacing-size(2);
				}
	
				&-btn {
					width: 40rpx;
					height: 40rpx;
					font-weight: bold;
					border-radius: 50%;
	
					&-add {
						color: $text-primary ;
						background: $dark-gold;
						position: relative;
	
						&::after {
							content: '+';
							position: absolute;
							top: 0rpx;
							left: 50%;
							transform: translateX(-50%);
							@include font-size(lg);
						}
					}
	
					&-sub {
						border: 1px solid $dark-gold;
						color: $dark-gold;
						position: relative;
	
						&::after {
							content: '—';
							position: absolute;
							top: 0rpx;
							left: 50%;
							transform: translateX(-50%);
							@include font-size(xs);
							font-weight: 500;
						}
					}
				}
			}
		}
	}
	
	.bottom-add {
		background: #eee;
		position: fixed;
		width: 100%;
		z-index: 10;
		bottom: 160rpx;
		box-sizing: border-box;
	}
	
	.bottom {
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		z-index: 10;
		bottom: 0;
		height: 160rpx;
		background: #fff;
	
		&-total {
			&-title {
				color: $dark-gold;
			}
	
			&-price {}
		}
	
		&-btn {
			// box-sizing: border-box;
			width: 352rpx;
		}
	}
</style>