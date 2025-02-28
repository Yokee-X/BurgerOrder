<template>
	<button :class="[{'button-primary':props.primary},props.customClass]" :style="props.customStyle" class="button fs-base radius-base" >
		<slot></slot>
	</button>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const attrs = useAttrs();
	const props  = defineProps({
		primary: {
			type: Boolean,
			default: false
		},
		customClass:String,
		customStyle:{
			type:[String,Object]
		},
	})
	
</script>

<style  lang="scss">
	@import '../../style/common.scss';
	.button {
		@include gold-border;
		color:$gold-color ;
		background: transparent;
		transition: all 0.3s;
		padding: spacing-size(1) spacing-size(4);
		line-height: 1.7;
	}
	
	.button-primary {
		background: $gold-gradient;
		color: $text-primary;
		border: none;
		&:disabled {
			background: $medium-gray;
			color: $text-secondary;
		}
	}
</style>