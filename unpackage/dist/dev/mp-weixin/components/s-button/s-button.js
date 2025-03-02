"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "s-button",
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    customClass: String,
    customStyle: {
      type: [String, Object]
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n({
          "button-primary": props.primary
        }),
        b: common_vendor.n(props.customClass),
        c: common_vendor.s(props.customStyle)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/s-button/s-button.js.map
