<template>
	<uni-popup ref="popupRef" type="bottom" @change="modalChange">
		<view class="container">
			<view class="iconfont icon-close close p-1 radius-circle"></view>
			<scroll-view :scroll-y="true" class="scroll">
				<view  class="flex column good items-center">
					<view class="good-img p-2">
						<image :src="props.good?.image" mode="aspectFit" style="width: 100%"></image>
					</view>
					<view class="good-main flex justify-between items-center">
						<text class="good-label  fs-md">{{props.good?.label}}</text>
						<text class="good-sell fs-sm">月售{{props.good?.sell}}</text>
					</view>
					<view class="add flex column">
						<text class="add-title fs-sm">来点小料</text>
						<view v-for="(ingredient,key) in ingredientList" :key="key"
							class="add-item flex justify-between items-center">
							<text class="add-item-label">{{ingredient.label}}</text>
							<text class="add-item-price">￥{{ingredient.price}}</text>
							<AddSubtractButton @reduce="(total)=>updateAddMap(ingredient,total)"
								@add="(total)=>updateAddMap(ingredient,total)"></AddSubtractButton>
						</view>
					</view>
				</view>
				
			</scroll-view>
			<view class="flex justify-between bottom-add p-1" v-show="addListTitleShow">
				<text class="fs-sm">已选：{{addListTitle}}</text>
			</view>
			<view class="bottom flex justify-between column p-2">

				<view class="flex justify-between bottom-total">
					<text class="bottom-total-title fs-md">￥<text
							class="bottom-total-price fs-xl">{{totalPrice}}</text>/个</text>
					<AddSubtractButton @reduce="updateGoodTotal" @add="updateGoodTotal" :init="1" :minNumber="1">
					</AddSubtractButton>
				</view>
				<view class="flex justify-between ">
					<SButton @tap="buyNow" class="bottom-btn">立即购买</SButton>
					<SButton @tap="addCart" class="bottom-btn" primary>加入购物车</SButton>
				</view>
			</view>

		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useCartStore
	} from '/stores/cart';
	import {
		storeToRefs
	} from 'pinia'
	const props = defineProps({
		good: {
			type: Object, //当前选择的商品
			default: () => ({})
		},
	})
	const popupRef = ref(null)
	const store = useCartStore() //购物车store
	const {
		cart
	} = storeToRefs(store)
	const {
		updateCart
	} = store
	const ingredientList = ref([]) //小料列表数据
	const ingredientMap = ref({}) //小料列表映射
	const addMap = ref({}) //加料列表数据
	const goodTotal = ref(1) //商品个数

	const open = () => {
		console.log('调用open', popupRef.value)
		popupRef.value.open()
	}
	defineExpose({
		open
	})

	const $emit = defineEmits(['change'])
	const modalChange = ({
		show
	}) => {
		addMap.value = {}
		goodTotal.value = 1
		$emit('change', show)
	}
	onMounted(() => {
		console.log(popupRef.value, '1111111111111')
	})

	onLoad(() => {
		//获取数据
		import('/api/add.json').then(res => {
			ingredientList.value = res.default
			res.default.forEach((item) => {
				ingredientMap
					.value[item.id] = item
			})
		})
	})
	//加料是否展示
	const addListTitleShow = computed(() => {
		const show = Object.keys(addMap.value).length != 0 || Object.keys(addMap.value).some(id => addMap.value?.[
			id
		] !== 0)
		console.log(Object.keys(addMap.value).length, 'show')
		return show
	})
	//加料展示标题
	const addListTitle = computed(() => {
		const title = []
		Object.keys(addMap.value).forEach((id) => {
			if (addMap.value[id]) title.push(ingredientMap.value[id].label + 'x ' + addMap.value[id])
		})
		return title.join('、')
	})
	//总价格
	const totalPrice = computed(() => {
		const ingredientPrice = Object.keys(addMap.value).reduce((pre, id) => {
			pre = pre + ingredientMap.value[id].price * addMap.value[id]
			return pre
		}, 0)
		const goodPirce = goodTotal.value * (props.good?.price || 0)
		return ingredientPrice + goodPirce
	})
	//跳转购买页面
	const buyNow = () => {}
	//加入购物车
	const addCart = () => {
		const ingredient = []
		Object.keys(addMap.value).forEach((id) => {
			if (addMap.value[id]) ingredient.push({
				...ingredientMap.value[id],
				total: addMap.value[id]
			})
		})
		const obj = {
			...props.good,
			ingredient
		}
		updateCart((value) => [...value, obj])
		popupRef.value?.close()
	}

	//加减小料
	const updateAddMap = (ingredient, total) => {
		addMap.value[ingredient.id] = total
	}
	//更新商品个数
	const updateGoodTotal = (total) => {
		goodTotal.value = total
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
		&::after{
			content: '';
			clear: both;
			visibility: hidden;
			display: none;
		}
	}
	.scroll{
		height: calc(90vh - 160rpx);
	}
	.good {
		// position: relative;
		padding-bottom: 80rpx;
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
		width: 100%;
		position: fixed;
		z-index: 10;
		bottom: 160rpx;
		box-sizing: border-box;
		  flex-shrink: 0;
	}

	.bottom {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		z-index: 10;
		bottom: 0;
		height: 160rpx;
		background: #fff;
  flex-shrink: 0;
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