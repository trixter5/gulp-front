import debounce from "lodash/debounce";
import init from "@/modules/_utils/plugin-init";

class Header {
  constructor(element, options) {
    this.element = element;
    this.name = "header";

    this._defaults = {
      fixedClassName: "header_fixed"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.headerScrollHandler();
  }

  bindEvents() {
    window.addEventListener(
      "scroll",
      debounce(this.headerScrollHandler.bind(this), 66)
    );
  }

  headerScrollHandler() {
    let top = Math.abs(document.body.getBoundingClientRect().y);
    let fixed = false;

    if (top > 0) {
      fixed = true;
    }

    this.element.classList.toggle(this.options.fixedClassName, fixed);
  }
}

export default init(Header);
