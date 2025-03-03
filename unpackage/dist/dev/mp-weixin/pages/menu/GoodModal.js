"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "goodModal",
  props: {
    good: {
      type: Object,
      //当前选择的商品
      default: () => ({})
    }
  },
  emits: ["change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const store = stores_cart.useCartStore();
    common_vendor.storeToRefs(store);
    const popupRef = common_vendor.ref(null);
    const visible = common_vendor.ref(false);
    common_vendor.ref([]);
    const ingredientMap = common_vendor.ref({});
    const addMap = common_vendor.ref({});
    const goodTotal = common_vendor.ref(1);
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:96", "mounted", visible.value, popupRef.value);
    });
    common_vendor.onUpdated(() => {
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:99", "update", visible.value, popupRef.value);
    });
    common_vendor.computed(() => {
      const show = Object.keys(addMap.value).length != 0 || Object.keys(addMap.value).some((id) => {
        var _a;
        return ((_a = addMap.value) == null ? void 0 : _a[id]) !== 0;
      });
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:105", Object.keys(addMap.value).length, "show");
      return show;
    });
    common_vendor.computed(() => {
      const title = [];
      Object.keys(addMap.value).forEach((id) => {
        if (addMap.value[id])
          title.push(ingredientMap.value[id].label + "x " + addMap.value[id]);
      });
      return title.join("、");
    });
    common_vendor.computed(() => {
      var _a;
      const ingredientPrice = Object.keys(addMap.value).reduce((pre, id) => {
        pre = pre + ingredientMap.value[id].price * addMap.value[id];
        return pre;
      }, 0);
      const goodPirce = goodTotal.value * (((_a = props.good) == null ? void 0 : _a.price) || 0);
      return ingredientPrice + goodPirce;
    });
    const open = () => {
      var _a;
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:154", "调用open", popupRef.value);
      if (popupRef.value) {
        visible.value = true;
        (_a = popupRef.value) == null ? void 0 : _a.open();
      }
    };
    __expose({
      open
    });
    const $emit = __emit;
    const modalChange = ({ show }) => {
      addMap.value = {};
      goodTotal.value = 1;
      visible.value = show;
      $emit("change", show);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr(popupRef, "7f868348-0", {
          "k": "popupRef"
        }),
        b: common_vendor.o(modalChange),
        c: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f868348"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/goodModal.js.map
