<template>
	<button :class="[{'button-primary':props.primary},$attrs.class]" class="button fs-base radius-base" >
		<slot></slot>
	</button>
</template>

<script setup>
	const props  = defineProps({
		primary: {
			type: Boolean,
			default: false
		}
	})
</script>

<style scoped lang="scss">
	@import '../../style/common.scss';
	.button {
		@include gold-border;
		color:$gold-color ;
		background: transparent;
		transition: all 0.3s;
		padding: spacing-size(1) spacing-size(4);
		line-height: 1.7;
		&:hover {
			opacity: 0.9;
		}
	}
	
	.button-primary {
		background: $gold-gradient;
		color: $text-primary;
		border: none;
	
		&:hover {
			opacity: 0.9;
			box-shadow: $shadow-gold;
		}
	
		&:disabled {
			background: $medium-gray;
			color: $text-secondary;
		}
	}
</style>