import { ref } from 'vue'
import {
	defineStore
} from 'pinia'

//购物车
export const useCartStore = defineStore('cart', () => {
	const cart = ref(new Map())
	const updateCart = (cb) =>{
		cart.value = cb(cart.value)
		console.log('更新cart',cart.value)
	}
	return {
		cart,
		updateCart
	}
})