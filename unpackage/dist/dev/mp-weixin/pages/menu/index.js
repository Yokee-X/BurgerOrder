"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_cart = require("../../stores/cart.js");
if (!Array) {
  const _easycom_SButton2 = common_vendor.resolveComponent("SButton");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_SButton2 + _easycom_uni_badge2)();
}
const _easycom_SButton = () => "../../components/SButton/SButton.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_SButton + _easycom_uni_badge + popup + cartVue)();
}
const popup = () => "./popup.js";
const cartVue = () => "./cart.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = stores_cart.useCartStore();
    const {
      cart
    } = common_vendor.storeToRefs(store);
    const category = common_vendor.ref([]);
    const currentCategory = common_vendor.ref(0);
    const goodModalRef = common_vendor.ref(null);
    const goodModalItem = common_vendor.ref(null);
    const scrollStop = common_vendor.ref(false);
    const cartMap = common_vendor.ref({});
    common_vendor.watch(cart.value, (newVal) => {
      cartMap.value = {};
      [...cart.value.values()].forEach((item) => {
        if (cartMap.value[item.id]) {
          cartMap.value[item.id] += item.total;
        } else {
          cartMap.value[item.id] = item.total;
        }
      });
    });
    common_vendor.onLoad(() => {
      Promise.resolve(require("../../api/categorys.js")).then((res) => {
        category.value = res.default;
      });
    });
    const changeCurCategory = (i) => {
      currentCategory.value = i;
    };
    const pickGood = (good) => {
      goodModalItem.value = good;
      common_vendor.nextTick$1(() => {
        var _a;
        (_a = goodModalRef.value) == null ? void 0 : _a.open();
      });
    };
    const stopScroll = (visible) => {
      scrollStop.value = visible;
    };
    return (_ctx, _cache) => {
      return {
        a: "overflow:" + (scrollStop.value ? "hidden" : "visible"),
        b: common_vendor.f(category.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: index,
            c: currentCategory.value == index ? 1 : "",
            d: common_vendor.o(($event) => changeCurCategory(index), index)
          };
        }),
        c: common_vendor.f(category.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.f(item.goods, (good, ind, i1) => {
              return {
                a: good.image,
                b: common_vendor.t(good.label),
                c: common_vendor.t(good.sell),
                d: common_vendor.t(good.price),
                e: common_vendor.o(($event) => pickGood(good), ind),
                f: "1f245baa-1-" + i0 + "-" + i1 + "," + ("1f245baa-0-" + i0 + "-" + i1),
                g: "1f245baa-0-" + i0 + "-" + i1,
                h: common_vendor.p({
                  text: cartMap.value[good.id],
                  type: "error",
                  absolute: "rightTop"
                }),
                i: ind
              };
            }),
            c: index
          };
        }),
        d: common_vendor.sr(goodModalRef, "1f245baa-2", {
          "k": "goodModalRef"
        }),
        e: common_vendor.o(stopScroll),
        f: common_vendor.p({
          good: goodModalItem.value
        }),
        g: common_vendor.o(stopScroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f245baa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/index.js.map
