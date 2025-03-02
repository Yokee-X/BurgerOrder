<template>
	<uni-popup ref="goodModal" type="bottom" border-radius="10px 10px 0 0" background-color="#fff"
		@change="modalChange">
		<view>
			<scroll-view scroll-y>
				<view class="flex column good items-center">
					<view class="good-img p-2">
						<image :src="props.good?.image" mode="aspectFit" style="width: 100%;
						"></image>
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
			<view class="flex justify-between bottom-add p-1">
				<text class="fs-sm">已选：{{addListTitle}}</text>
			</view>
			<view class="bottom flex justify-between column">

				<view class="flex justify-between bottom-total  m-2">
					<text class="bottom-total-title fs-md">￥<text
							class="bottom-total-price fs-xl">{{totalPrice}}</text>/个</text>
					<AddSubtractButton @reduce="updateGoodTotal" @add="updateGoodTotal" :init="1" :minNumber="1">
					</AddSubtractButton>
				</view>
				<view class="flex justify-between   m-2">
					<s-button @tap="buyNow" class="bottom-btn">立即购买</s-button>
					<s-button @tap="addCart" class="bottom-btn" primary>加入购物车</s-button>
				</view>
			</view>

		</view>
	</uni-popup>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
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
	const store = useCartStore() //购物车store
	const {
		cart
	} = storeToRefs(store)
	const {
		updateCart
	} = store
	const props = defineProps({
		good: {
			type: Object, //当前选择的商品
			default: () => ({})
		}
	})
	const ingredientList = ref([]) //小料列表数据
	const ingredientMap = ref({}) //小料列表映射
	const addMap = ref({}) //加料列表数据
	const goodTotal = ref(1) //商品个数
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
	const goodModal = ref(null)
	//加料展示标题
	const addListTitle = computed((oldVal) => {
		const title = []
		Object.keys(addMap.value).forEach((id) => {
			if (addMap.value[id]) title.push(ingredientMap.value[id].label + 'x ' + addMap.value[id])
		})
		return title.join('、')
	})
	//总价格
	const totalPrice = computed((oldVal) => {
		const ingredientPrice = Object.keys(addMap.value).reduce((pre, id) => {
			pre = pre + ingredientMap.value[id].price * addMap.value[id]
			return pre
		}, 0)
		const goodPirce = goodTotal.value * (props.good?.price || 0)
		console.log(goodTotal, goodPirce, 'goodPirce')
		return ingredientPrice + goodPirce
	})
	const buyNow = () => {
		//跳转购买页面
	}
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
		goodModal.value?.close()
	}

	//加减小料
	const updateAddMap = (ingredient, total) => {
		addMap.value[ingredient.id] = total
	}
	//更新商品个数
	const updateGoodTotal = (total) => {
		goodTotal.value = total
	}
	//暴露modal方法
	const open = (direction) => {
		goodModal.value?.open(direction); // 通过ref调用组件内的方法
	};
	defineExpose({
		open
	})
	//modal change
	const $emit = defineEmits(['change'])
	const modalChange = ({
		show
	}) => {
		addMap.value = {}
		goodTotal.value = 1
		$emit('change', show)
	}
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';

	.good {
		position: relative;
		height: 90vh;
		overflow-y: auto;
		box-sizing: border-box;
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