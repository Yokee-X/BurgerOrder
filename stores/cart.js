import { ref } from 'vue'
import {
	defineStore
} from 'pinia'

//购物车
export const useCartStore = defineStore('cart', () => {
	const cart = ref([])
	const updateCart = (cb) =>{
		cart.value = cb(cart.value)
	}
	console.log(cart.value,'cart')
	return {
		cart,
		updateCart
	}
})