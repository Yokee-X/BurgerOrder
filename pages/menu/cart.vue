<template>
	<view>
		<view v-show="number" class="cart flex items-center justify-between" @tap="togglePopup">
			<uni-badge :text="number" type="error" absolute="rightTop">
				<view class="container">
					<!-- <view class="badge">{{number}}</view> -->
					<image class="img" src="/common/burgerIcon.png" mode="aspectFit"></image>
				</view>
			</uni-badge>
			<text class="price">￥<text class="num">{{total}}</text></text>
			<button class="btn fs-base ">去结算</button>

		</view>
		<uni-popup ref="popupRef" type="bottom" @change="modalChange" customStyle="z-index:10" :safe-area="false">
			<!-- 最多展示4个 -->
			<view class="cart-detail">
				<view class="cart-detail-info flex justify-between items-center fs-sm ">
					<view>已点<text class="fs-md">{{number}}</text>份</view>
					<view class="clear p-1 flex items-center" @tap="clear"><text
							class="iconfont icon-delete icon"></text><text>清空</text></view>
				</view>
				<scroll-view scroll-y class="scroll">
					<view class="item flex justify-between" v-for="([gid,item],key) in cart" :key="gid">
						<image class="item-image" :src="item.image"></image>
						<view class="item-content flex-1 flex column justify-between">
							<view class="item-content-label ">{{item.label}}</view>
							<view class="item-content-sub">
								<text class="item-content-sub-text fs-sm" v-for="(ingredient,index) in item.ingredient"
									:key="index">
									{{ingredient.label}} x{{ingredient.total}}(+{{ingredient.total*ingredient.price}}元)
								</text>
							</view>
							<view class="item-content-bottom flex justify-between">
								<view class="item-price ">￥<text class="fs-xl">{{item.simplePrice*item.total}}</text>
								</view>
								<AddSubtractButton :init="item.total" @add="(total)=>updateNumber(item,total)"
									@reduce="(total)=>updateNumber(item,total)"></AddSubtractButton>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="popupClearRef" type="center">
			<view class="flex column justify-center items-center clear-popup">
				<view class="fs-xl clear-text">确认清空购物车？</view>
				<view class="flex clear-btns">
					<SButton @tap="closeClear" custom-style="width:200rpx;">取消</SButton>
					<SButton primary  @tap="confirmClear" custom-style="width:200rpx;">确认</SButton>
				</view>
			</view>
		</uni-popup>
	</view>

</template>

<script setup>
	import {
		computed,
		onUpdated,
		ref,
		watch,

	} from 'vue';
	import {
		useCartStore
	} from '/stores/cart';
	import {
		storeToRefs
	} from 'pinia'
	const store = useCartStore() //购物车store
	const {
		cart
	} = storeToRefs(store)
	const {
		updateCart
	} = store
	const popupRef = ref(null)//购物车弹窗
	const popupClearRef = ref(null)//清空购物车弹窗
	const visible = ref(false)
	const number = computed(() => [...cart.value.values()].reduce((pre,item)=>pre+=item.total,0) || '')

	const total = computed(() => {
		return [...cart.value.values()].reduce((pre, item) => pre += item.total * item.simplePrice, 0) || 0
	})
	//清空
	const clear = ()=>{
		popupClearRef.value.open()
	}
	//取消清空
	const closeClear =()=>{
		popupClearRef.value.close()
	}
	//确认清空
	const confirmClear=()=>{
		updateCart((cartMap) => {
			cartMap.clear()
			return cartMap
		})
		popupRef.value.close()
		closeClear()
	}
	//更新购物车
	const updateNumber = (item, total) => {
		console.log(item, total, 'update')
		updateCart((cartMap) => {
			if (total == 0) {
				cartMap.delete(item.gid)
			} else {
				cartMap.set(item.gid, {
					...item,
					total
				})
			}
			if(cartMap.size==0){
				popupRef.value.close()
				closeClear()
			}
			return cartMap
		})
	}
	//切换展示弹窗
	const togglePopup = () => {
		if (visible.value) {
			popupRef.value.close()
		} else {
			popupRef.value.open()
		}
		visible.value = !visible.value
	}

	//暴露给父级，防止滚动穿透
	const $emit = defineEmits(['change'])
	const modalChange = ({
		show
	}) => {
		$emit('change', show)
	}
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';

	.cart {
		position: fixed;
		width: 700rpx;
		background: #fff;
		height: 100rpx;
		bottom: 20rpx;
		z-index: 90;
		left: 25rpx;
		border-radius: 100rpx;
		// overflow: hidden;
		box-sizing: border-box;
		box-shadow: $shadow-base;
		padding: spacing-size(2);

		.container {
			width: 90rpx;
			height: 90rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.price {
			margin: 0 auto 0 spacing-size(3);
		}

	}

	.popup {
		z-index: 12;
	}

	.btn {
		height: 84rpx;
		width: 160rpx;
		text-align: center;
		line-height: 84rpx;
		border-radius: 84rpx;
		background: $gold-gradient;
		color: $text-primary;
		margin: 0 -6rpx 0 0;
		padding: 0;
	}

	.cart-detail {
		background: #fff;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		width: 100%;

		&-info {
			background: #eee;
			width: 100%;
			box-sizing: border-box;
			padding: spacing-size(2) 25rpx;

			.clear {
				box-sizing: border-box;
			}

			.icon {
				line-height: 1;
			}
		}

		.scroll {
			max-height: calc(50vh - 140rpx);
			min-height: 100rpx;
		}

		.item {
			box-sizing: border-box;
			padding: spacing-size(2) 25rpx;
			gap: spacing-size(2);

			&-image {
				width: 100rpx;
				height: 100rpx;
			}

			&-content {
				padding-bottom: spacing-size(1);
				border-bottom: 1px solid #EEE;

				&-label {
					font-weight: 400;

				}

				&-sub {

					// margin: spacing-size(2) 0;
					&-text {
						color: $light-gray;

						padding: 0 spacing-size(1);
						line-height: 1.2;

						&:not(:last-child) {
							border-right: 1rpx solid $light-gray;
						}

					}
				}

				&-bottom {

					.item-price {
						font-weight: 500;
					}
				}


			}
		}
	}
	
	.clear-popup{
		background: #fff;
		width: 600rpx;
		height: 200rpx;
		border-radius: 20rpx;
		.clear-text{
			font-weight: 600;
			margin-bottom: spacing-size(4);
		}
		.clear-btns{
			gap:spacing-size(2) ;
		}
	}


</style>