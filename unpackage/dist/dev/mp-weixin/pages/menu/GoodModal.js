"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_AddSubtractButton2 = common_vendor.resolveComponent("AddSubtractButton");
  const _easycom_s_button2 = common_vendor.resolveComponent("s-button");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_AddSubtractButton2 + _easycom_s_button2 + _easycom_uni_popup2)();
}
const _easycom_AddSubtractButton = () => "../../components/AddSubtractButton/AddSubtractButton.js";
const _easycom_s_button = () => "../../components/s-button/s-button.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_AddSubtractButton + _easycom_s_button + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "GoodModal",
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
    const goodModal = common_vendor.ref(null);
    const addListTitle = common_vendor.computed((oldVal) => {
      const title = [];
      Object.keys(addMap.value).forEach((id) => {
        if (addMap.value[id])
          title.push(ingredientMap.value[id].label + "x " + addMap.value[id]);
      });
      return title.join("、");
    });
    const totalPrice = common_vendor.computed((oldVal) => {
      var _a;
      const ingredientPrice = Object.keys(addMap.value).reduce((pre, id) => {
        pre = pre + ingredientMap.value[id].price * addMap.value[id];
        return pre;
      }, 0);
      const goodPirce = goodTotal.value * (((_a = props.good) == null ? void 0 : _a.price) || 0);
      common_vendor.index.__f__("log", "at pages/menu/GoodModal.vue:106", goodTotal, goodPirce, "goodPirce");
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
      (_a = goodModal.value) == null ? void 0 : _a.close();
    };
    const updateAddMap = (ingredient, total) => {
      addMap.value[ingredient.id] = total;
    };
    const updateGoodTotal = (total) => {
      goodTotal.value = total;
    };
    const open = (direction) => {
      var _a;
      (_a = goodModal.value) == null ? void 0 : _a.open(direction);
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
            e: "069111c6-1-" + i0 + ",069111c6-0",
            f: key
          };
        }),
        e: common_vendor.t(addListTitle.value),
        f: common_vendor.t(totalPrice.value),
        g: common_vendor.o(updateGoodTotal),
        h: common_vendor.o(updateGoodTotal),
        i: common_vendor.p({
          init: 1,
          minNumber: 1
        }),
        j: common_vendor.o(buyNow),
        k: common_vendor.o(addCart),
        l: common_vendor.p({
          primary: true
        }),
        m: common_vendor.sr(goodModal, "069111c6-0", {
          "k": "goodModal"
        }),
        n: common_vendor.o(modalChange),
        o: common_vendor.p({
          type: "bottom",
          ["border-radius"]: "10px 10px 0 0",
          ["background-color"]: "#fff"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-069111c6"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/GoodModal.js.map
