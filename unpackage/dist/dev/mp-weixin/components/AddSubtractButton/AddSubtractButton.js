"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "AddSubtractButton",
  props: {
    init: {
      type: Number,
      default: 0
    },
    minNumber: {
      type: Number,
      default: 0
    },
    maxNumber: {
      type: Number,
      default: 99
    },
    showReduce: {
      type: Boolean,
      default: false
    }
  },
  emits: ["add", "reduce"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const total = common_vendor.ref(props.init);
    const $emit = __emit;
    const subtract = () => {
      if (total.value > props.minNumber) {
        total.value -= 1;
      }
      $emit("reduce", total.value);
    };
    const add = () => {
      if (total.value < props.maxNumber) {
        total.value += 1;
      }
      common_vendor.index.__f__("log", "at components/AddSubtractButton/AddSubtractButton.vue:48", "add", total.value);
      $emit("add", total.value);
    };
    return (_ctx, _cache) => {
      return {
        a: total.value == props.minNumber ? 1 : "",
        b: total.value ? "visible" : "hidden",
        c: common_vendor.o(subtract),
        d: common_vendor.t(total.value),
        e: total.value ? "visible" : "hidden",
        f: common_vendor.o(add)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-39d20ded"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/AddSubtractButton/AddSubtractButton.js.map
