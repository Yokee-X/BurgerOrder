"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_SButton2 = common_vendor.resolveComponent("SButton");
  _easycom_SButton2();
}
const _easycom_SButton = () => "../../components/SButton/SButton.js";
if (!Math) {
  (_easycom_SButton + goodModal)();
}
const goodModal = () => "./goodModal.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const category = common_vendor.ref([]);
    const currentCategory = common_vendor.ref(0);
    const goodModalRef = common_vendor.ref(null);
    const goodModalItem = common_vendor.ref(null);
    const scrollStop = common_vendor.ref(false);
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
    const get = (visible) => {
      common_vendor.index.__f__("log", "at pages/menu/index.vue:89", "父级get", visible);
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
                f: "1f245baa-0-" + i0 + "-" + i1,
                g: ind
              };
            }),
            c: index
          };
        }),
        d: common_vendor.sr(goodModalRef, "1f245baa-1", {
          "k": "goodModalRef"
        }),
        e: common_vendor.o(get),
        f: common_vendor.p({
          good: goodModalItem.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f245baa"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/menu/index.js.map
