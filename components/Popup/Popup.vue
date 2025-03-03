<template>
  <!-- 遮罩层 -->
  <transition name="fade">
    <view
      v-if="visible"
      class="popup-overlay"
      :class="[`popup-${direction}`]"
      @tap="handleOverlayClick"
    >
      <!-- 内容区域 -->
      <transition :name="transitionName">
        <view
		  v-if="visible"
          class="popup-content"
          :class="[`popup-${direction}-content`]"
		  @tap.stop="()=>{}"
        >
          <slot></slot>
        </view>
      </transition>
    </view>
  </transition>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'

const props = defineProps({
  // 使用 v-model:visible 控制显隐
  visible: {
    type: Boolean,
    default: false
  },
  // 弹出方向：top|bottom|center|left|right
  direction: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom', 'center', 'left', 'right'].includes(value)
  },
  // 点击遮罩层是否关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
})
onMounted(()=>{
	console.log(props.visible,'visible')
})
const emit = defineEmits(['update:visible', 'change'])

// 根据方向返回不同的动画名称
const transitionName = computed(() => {
  const map = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left',
    center: 'fade-scale'
  }
  return map[props.direction]
})

// 处理遮罩层点击
const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    emit('update:visible', false)
  }
}

// 监听 visible 变化
watch(() => props.visible, (newVal) => {
	emit('change', newVal)
  // if (newVal) {
  //   document.body.style.overflow = 'hidden'
  // } else {
  //   document.body.style.overflow = ''
  // }
})
</script>

<style >
/* 遮罩层样式 */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 99;
  
}
/* 不同方向的定位 */
  .popup-bottom {
    align-items: flex-end;
  }
  .popup-top {
    align-items: flex-start;
  }
  .popup-center {
    align-items: center;
    justify-content: center;
  }
  .popup-left {
    justify-content: flex-start;
  }
  .popup-right {
    justify-content: flex-end;
  }
  
  /* 内容区域基本样式 */
  .popup-content {
    background: #fff;
    position: relative;
    /* max-height: 80vh; */
    /* overflow-y: auto; */
  }
  
  /* 不同方向的内容区域尺寸 */
 ::v-deep( .popup-bottom-content,
  .popup-top-content) {
    width: 100%;
  }
  .popup-left-content,
  .popup-right-content {
    height: 100%;
  }
  .popup-center-content {
    border-radius: 8px;
    max-width: 80%;
    max-height: 80%;
  }
  
  /* 过渡动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }
  
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-100%);
  }
  
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-left-enter-from,
  .slide-left-leave-to {
    transform: translateX(100%);
  }
  
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.3s ease;
  }
  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(-100%);
  }
  
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: all 0.3s ease;
  }
  .fade-scale-enter-from,
  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

</style>