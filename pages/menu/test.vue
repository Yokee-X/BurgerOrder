<template>
	<page-meta :page-style="'overflow:'+(scrollStop?'hidden':'visible')"></page-meta>
	<view class="menu-page">
		<view class="bg-dark"></view>
		<view class="main-info p-3 flex column justify-around">
			<text class="main-info-logo">SAP Burger</text>
			<view class="main-info-intro flex justify-between items-center">
				<text class="main-info-sub ">欢迎光临，很高兴为你服务</text>
				<text class="main-info-sub ">位置</text>
			</view>
			<view class="reservation-container p-2 radius-base flex items-center">
				<text class="iconfont icon-time-task"></text>
				<text class="fs-sm">预约取餐时间 &gt;</text>
			</view>
		</view>
		<view class="menu-container">
			<!-- 左侧类目列表 -->
			<view class=" flex">
				<view class="left">
					<view v-for="(item,index) in category" :key="index" class="categroy p-3"
						:class="{'categroy-active':currentCategory==index}" @tap="changeCurCategory(index)">
						{{item.label}}
					</view>
				</view>
				<!-- 右侧商品列表 -->
				<scroll-view scroll-y>
					<view class="right flex-1">
						<view v-for="(item,index) in category" class="categroy-main p-2" :key="index">
							<text class="categroy-name fs-lg">{{item.label}}</text>
							<view class="good flex" v-for="(good,ind) in item.goods" :key="ind">
								<image class="good-img" :src="good.image"></image>
								<view class="flex flex-1 column p-2 justify-between">
									<view class="flex column">
										<text class="good-label fs-md">{{good.label}}</text>
										<text class="good-sell fs-sm">月售{{good.sell}}</text>
									</view>
									<view class="flex justify-between items-center">
										<text class="good-pirce fs-sm"><text class="fs-sm"
												style="font-weight: 600;">￥<text
													class="fs-md">{{good.price}}</text></text>/份</text>
										<SButton @tap="pickGood(good)">选规格</SButton>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		
		</view>
		
		<!-- <view v-for="(item,index) in 6" :key="index">
		
		<SButton @tap="pickGood({a:123})">选规格</SButton>
	</view> -->
		<popup ref="goodModalRef" @change="get" :good="goodModalItem"></popup>
	</view>
</template>

<script setup>
	import {
		nextTick,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import popup from './popup.vue'
	const category = ref([]) //商品类目
	const currentCategory = ref(0) //当前选中的类目
	const goodModalRef = ref(null)
	const goodModalItem = ref(null) //选择规格弹窗
	const scrollStop = ref(false) //控制滚动穿透
	onLoad(() => {
		//获取数据
		import('/api/categorys.json').then(res => {
			category.value = res.default
		})
	})
	const changeCurCategory = (i) => {
		currentCategory.value = i
	}
	const pickGood = (good) => {
		goodModalItem.value = good
		nextTick(() => {
			goodModalRef.value?.open();
		})
	}
	const get = (visible) => {
		console.log('父级get', visible)
		scrollStop.value = visible
	}
</script>

<style lang="scss" scoped>
	@import '../../style/common.scss';
	@import '../../style/iconfont.css';

	.menu-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;

		.bg-dark {
			background: $primary-color;
			height: 120rpx;
			width: 100%;
		}

		.main-info {
			position: relative;
			transform: translateY(-100rpx);
			// top: -100rpx;
			width: 720rpx;
			background: #fff;
			border-radius: 20px;
			height: 240rpx;
			box-sizing: border-box;

			&-logo {
				color: $gold-color;
				font-size: 46rpx;
				font-weight: 600;
			}

			&-intro {
				display: flex;
				color: $light-gray;
				padding: spacing-size(2) 0;
			}

			.reservation-container {
				box-sizing: border-box;
				background: $dark-gold;
				color: $text-primary;
				gap: spacing-size(1);
			}
		}

		.menu-container {
			width: 100%;
			margin-top: -100rpx;
		}

		.left {
			width: 200rpx;
			height: 100vh;
			z-index: 10;
			position: sticky;
			top: 0;
			// border:1px solid blue;
			background: $primary-color;

			.categroy {
				box-sizing: border-box;
				width: 100%;
				text-align: center;
				line-height: 2;
				color: $text-primary;

				&-active {
					color: $text-gold;
					background: #fff;
					border-left: 2px solid $text-gold;
				}
			}

		}

		.right {
			.categroy-main {
				box-sizing: border-box;

				.categroy-name {
					font-weight: 600;
				}

				.good {
					padding: spacing-size(2);

					&-img {
						width: 180rpx;
						height: 180rpx;
					}

					&-label {
						font-weight: 500;
					}

					&-sell {
						color: $text-secondary ;
					}

					&-btn {
						color: $dark-gold;
						background-color: $primary-color ;
						@include radius-size(lg)
					}
				}
			}


		}


	}



	// .menu-page {
	//   display: flex;
	//   height: 100vh;

	//   .category-list {
	//     width: 200rpx;
	//     background: #f8f8f8;

	//     .category-item {
	//       padding: 32rpx;
	//       font-size: 28rpx;

	//       &.active {
	//         background: #fff;
	//         color: $u-primary;
	//         font-weight: bold;
	//       }
	//     }
	//   }

	//   .product-list {
	//     flex: 1;
	//     padding: 20rpx;
	//   }

	//   .cart-sidebar {
	//     position: fixed;
	//     right: 40rpx;
	//     bottom: 200rpx;
	//     background: #fff;
	//     padding: 20rpx;
	//     border-radius: 50%;
	//     box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
	//     z-index: 999;
	//   }
	// }
</style>