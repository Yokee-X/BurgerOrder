"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_s_button2 = common_vendor.resolveComponent("s-button");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_s_button2 + _easycom_uni_popup2)();
}
const _easycom_s_button = () => "../../components/s-button/s-button.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_s_button + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "GoodModal",
  props: {
    good: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    common_vendor.index.__f__("log", "at pages/menu/GoodModal.vue:33", props.good, "propsorpsr");
    const goodModal = common_vendor.ref(null);
    const open = (direction) => {
      var _a;
      (_a = goodModal.value) == null ? void 0 : _a.open(direction);
    };
    const tap = () => common_vendor.index.__f__("log", "at pages/menu/GoodModal.vue:38", "tap");
    __expose({
      open
    });
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_assets._imports_0$1,
        b: common_assets._imports_0$1,
        c: common_assets._imports_0$1,
        d: common_assets._imports_0$1,
        e: common_assets._imports_0$1,
        f: common_assets._imports_0$1,
        g: common_vendor.t((_a = props.good) == null ? void 0 : _a.label),
        h: common_vendor.o(tap),
        i: common_vendor.o(tap),
        j: common_vendor.p({
          primary: true
        }),
        k: common_vendor.sr(goodModal, "069111c6-0", {
          "k": "goodModal"
        }),
        l: common_vendor.o(({
          show
        }) => _ctx.$emit("change", show)),
        m: common_vendor.p({
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
