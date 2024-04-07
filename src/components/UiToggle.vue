<template>
	<div
		class="ui-toggle"
		@click="update"
		:class="{ 'ui-toggle--active': modelValue }"
	>
		<div class="ui-toggle__circle"></div>
	</div>
</template>

<script lang="ts" setup>
const $props = defineProps<{
	modelValue: boolean
}>()

const $emits = defineEmits(['update:modelValue'])

function update() {
	$emits('update:modelValue', !$props.modelValue)
}
</script>

<style lang="scss" scoped>
$height: 22px;

.ui-toggle {
	display: inline-block;
	width: 2 * $height;
	height: $height;
	min-width: 2 * $height;
	border-radius: ($height + 2) * 0.5;
	position: relative;
  background: #aa1e05;
  transition: 0.3s linear;
	cursor: pointer;
	box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.6);

  &--active {
    background: #fecb23;
  }

	&__circle {
		position: absolute;
		top: $height * -0.1;
		left: $height * -0.1;
		width: $height * 1.2;
		height: $height * 1.2;
		border-radius: 50%;
  	background: radial-gradient(ellipse at center, #538d70 0%, #144d2e 85%);
		box-sizing: border-box;
		transition: 0.1s linear;
		transform: translateX(0);
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
	}

	&--active &__circle {
		transform: translateX($height);
	}
}
</style>
