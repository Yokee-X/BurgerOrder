"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_AddSubtractButton2 = common_vendor.resolveComponent("AddSubtractButton");
  const _easycom_SButton2 = common_vendor.resolveComponent("SButton");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_AddSubtractButton2 + _easycom_SButton2 + _easycom_uni_popup2)();
}
const _easycom_AddSubtractButton = () => "../../components/AddSubtractButton/AddSubtractButton.js";
const _easycom_SButton = () => "../../components/SButton/SButton.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_AddSubtractButton + _easycom_SButton + _easycom_uni_popup)();
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
    const popupRef = common_vendor.ref(null);
    const store = stores_cart.useCartStore();
    common_vendor.storeToRefs(store);
    const {
      updateCart
    } = store;
    const ingredientList = common_vendor.ref([]);
    const ingredientMap = common_vendor.ref({});
    const addMap = common_vendor.ref({});
    const goodTotal = common_vendor.ref(1);
    const open = () => {
      var _a;
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:80", "调用open", popupRef.value);
      (_a = popupRef.value) == null ? void 0 : _a.open();
    };
    __expose({
      open
    });
    const $emit = __emit;
    const modalChange = ({
      show
    }) => {
      addMap.value = {};
      goodTotal.value = 1;
      $emit("change", show);
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:97", popupRef.value, "popupRef.value");
    });
    common_vendor.onLoad(() => {
      Promise.resolve(require("../../api/add.js")).then((res) => {
        ingredientList.value = res.default;
        res.default.forEach((item) => {
          ingredientMap.value[item.id] = item;
        });
      });
    });
    const addListTitleShow = common_vendor.computed(() => {
      const show = Object.keys(addMap.value).length != 0 || Object.keys(addMap.value).some((id) => {
        var _a;
        return ((_a = addMap.value) == null ? void 0 : _a[id]) !== 0;
      });
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:115", Object.keys(addMap.value).length, "show");
      return show;
    });
    const addListTitle = common_vendor.computed(() => {
      const title = [];
      Object.keys(addMap.value).forEach((id) => {
        if (addMap.value[id])
          title.push(ingredientMap.value[id].label + "x " + addMap.value[id]);
      });
      return title.join("、");
    });
    const totalPrice = common_vendor.computed(() => {
      var _a;
      const ingredientPrice = Object.keys(addMap.value).reduce((pre, id) => {
        pre = pre + ingredientMap.value[id].price * addMap.value[id];
        return pre;
      }, 0);
      const goodPirce = goodTotal.value * (((_a = props.good) == null ? void 0 : _a.price) || 0);
      return ingredientPrice + goodPirce;
    });
    const buyNow = () => {
    };
    const addCart = () => {
      var _a;
      const ingredient = [];
      Object.keys(addMap.value).forEach((id) => {
        if (addMap.value[id])
          ingredient.push({
            ...ingredientMap.value[id],
            total: addMap.value[id]
          });
      });
      const obj = {
        ...props.good,
        ingredient
      };
      updateCart((value) => [...value, obj]);
      (_a = popupRef.value) == null ? void 0 : _a.close();
    };
    const updateAddMap = (ingredient, total) => {
      addMap.value[ingredient.id] = total;
    };
    const updateGoodTotal = (total) => {
      goodTotal.value = total;
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: (_a = props.good) == null ? void 0 : _a.image,
        b: common_vendor.t((_b = props.good) == null ? void 0 : _b.label),
        c: common_vendor.t((_c = props.good) == null ? void 0 : _c.sell),
        d: common_vendor.f(ingredientList.value, (ingredient, key, i0) => {
          return {
            a: common_vendor.t(ingredient.label),
            b: common_vendor.t(ingredient.price),
            c: common_vendor.o((total) => updateAddMap(ingredient, total), key),
            d: common_vendor.o((total) => updateAddMap(ingredient, total), key),
            e: "7f868348-1-" + i0 + ",7f868348-0",
            f: key
          };
        }),
        e: common_vendor.t(addListTitle.value),
        f: addListTitleShow.value,
        g: common_vendor.t(totalPrice.value),
        h: common_vendor.o(updateGoodTotal),
        i: common_vendor.o(updateGoodTotal),
        j: common_vendor.p({
          init: 1,
          minNumber: 1
        }),
        k: common_vendor.o(buyNow),
        l: common_vendor.o(addCart),
        m: common_vendor.p({
          primary: true
        }),
        n: common_vendor.sr(popupRef, "7f868348-0", {
          "k": "popupRef"
        }),
        o: common_vendor.o(modalChange),
        p: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f868348"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/goodModal.js.map
