import Notification from "../notification/notification";

import { $ } from "../_utils/dom/select";

const componentsDemo = $(".demo_components");

if (componentsDemo) {
  // Notifications
  const notificationBoard = new Notification({
    delay: 40000
  });

  $(".js-notification-info").addEventListener("click", () => {
    notificationBoard.show("Short test message", {
      className: "notification_type_info"
    });
  });

  $(".js-notification-notice").addEventListener("click", () => {
    notificationBoard.show("Medium long test test message test", {
      className: "notification_type_notice"
    });
  });

  $(".js-notification-success").addEventListener("click", () => {
    notificationBoard.show(
      "Three line test test message test message test long message lorem ipsum",
      {
        className: "notification_type_success"
      }
    );
  });

  $(".js-notification-error").addEventListener("click", () => {
    notificationBoard.show("test message", {
      className: "notification_type_error"
    });
  });

  $(".js-notification-warning").addEventListener("click", () => {
    notificationBoard.show("test message", {
      className: "notification_type_warning"
    });
  });
}