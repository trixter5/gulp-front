import scrollTo from "@/modules/_utils/scrollTo";
import getOffsetTop from "@/modules/_utils/dom/getOffsetTop";
import { $ } from "@/modules/_utils/dom/select";

export default () => {
  const mainMenu = $(".main-menu");
  if (mainMenu) {
    const links = mainMenu.querySelectorAll('a[href^="#"]');
    const headerHeight = parseInt($(".header").offsetHeight);
    const duration = 700;
    const offset = headerHeight + 20;

    Array.prototype.forEach.call(links, link => {
      link.addEventListener("click", event => {
        event.preventDefault();

        const hash = link.getAttribute("href");
        const target = $(hash);

        if (target) {
          let options = { duration };
          const to = getOffsetTop(target) - offset;

          scrollTo({ to, options });

          if (history.pushState) {
            history.pushState(null, null, hash);
          } else {
            location.hash = hash;
          }
        }
      });
    });
  }
};
