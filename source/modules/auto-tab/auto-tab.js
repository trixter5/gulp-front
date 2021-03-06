import init from "@/modules/_utils/plugin-init";
import { KEYCODES } from "@/modules/_utils/constants";
import toArray from "@/modules/_utils/dom/toArray";

class AutoTab {
  constructor(element, options) {
    this.element = element;
    this.name = "autotab";

    this._defaults = {
      targetSelector: "input"
    };

    this.options = {
      ...this._defaults,
      ...options
    };

    this.init();
  }

  init() {
    this.buildCache();
    this.bindEvents();
  }

  buildCache() {
    const { targetSelector } = this.options;
    this.targets = toArray(this.element.querySelectorAll(targetSelector));
    this.selected = 0;
  }

  bindEvents() {
    this.targets.forEach(target => {
      target.addEventListener("keyup", event => this.handleKeydown(event));
      target.addEventListener("focus", event => this.handleFocusIn(event));
      target.addEventListener("blur", event => this.handleFocusOut(event));
    });
  }

  getElementOrderFromSet(elements = [], target) {
    let result = -1;
    elements.forEach((el, index) => {
      if (el === target) {
        result = index + 1;
      }
    });

    return result;
  }

  handleFocusIn(event) {
    const input = event.target;
    const index = this.getElementOrderFromSet(this.targets, input);
    this.selected = index - 1;
  }

  handleFocusOut() {
    this.selected = 0;
  }

  handleKeydown(event) {
    let first = 0;
    let last = this.targets.length - 1;
    const input = event.target;
    const inputLength = input.value.length;
    const keyCode = event.which || event.keyCode;
    const max = input.maxLength.valueOf();

    if (keyCode !== KEYCODES.TAB && keyCode !== KEYCODES.SHIFT) {
      if (keyCode === KEYCODES.DELETE || keyCode === KEYCODES.BACKSPACE) {
        if (inputLength === 0) {
          if (this.selected === first) {
            this.selected = last;
          } else {
            this.selected--;
          }
        }
      } else {
        if (inputLength === max) {
          if (this.selected >= last) {
            this.selected = first;
          } else {
            this.selected++;
          }
        }
      }
    }

    this.targets[this.selected].focus();
  }
}

export default init(AutoTab);
