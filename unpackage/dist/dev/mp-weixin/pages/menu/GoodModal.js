"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_AddSubtractButton2 = common_vendor.resolveComponent("AddSubtractButton");
  const _easycom_SButton2 = common_vendor.resolveComponent("SButton");
  const _easycom_Popup2 = common_vendor.resolveComponent("Popup");
  (_easycom_AddSubtractButton2 + _easycom_SButton2 + _easycom_Popup2)();
}
const _easycom_AddSubtractButton = () => "../../components/AddSubtractButton/AddSubtractButton.js";
const _easycom_SButton = () => "../../components/SButton/SButton.js";
const _easycom_Popup = () => "../../components/Popup/Popup.js";
if (!Math) {
  (_easycom_AddSubtractButton + _easycom_SButton + _easycom_Popup)();
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
    const store = stores_cart.useCartStore();
    common_vendor.storeToRefs(store);
    const {
      updateCart
    } = store;
    const visible = common_vendor.ref(false);
    const props = __props;
    const ingredientList = common_vendor.ref([]);
    const ingredientMap = common_vendor.ref({});
    const addMap = common_vendor.ref({});
    const goodTotal = common_vendor.ref(1);
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
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:96", Object.keys(addMap.value).length, "show");
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
      visible.value = false;
    };
    const updateAddMap = (ingredient, total) => {
      addMap.value[ingredient.id] = total;
    };
    const updateGoodTotal = (total) => {
      goodTotal.value = total;
    };
    const open = () => {
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:145", "调用open");
      visible.value = true;
    };
    __expose({
      open
    });
    const $emit = __emit;
    const modalChange = (visible2) => {
      common_vendor.index.__f__("log", "at pages/menu/goodModal.vue:154", visible2, "show");
      addMap.value = {};
      goodTotal.value = 1;
      $emit("change", visible2);
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
        n: common_vendor.o(modalChange),
        o: common_vendor.o(($event) => visible.value = $event),
        p: common_vendor.p({
          direction: "bottom",
          visible: visible.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f868348"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/goodModal.js.map
