document.addEventListener("DOMContentLoaded", function () {
  scrollToActiveItem();
  enableCollapsibles();
});

// Toggle the nearest branch node regardless of whether the trigger is the row button or chevron.
function toggleCollapsibleItem(trigger) {
  const list = trigger.closest("li");
  if (list) {
    list.classList.toggle("open");
  }
}

function enableCollapsibles() {
  const triggers = document.querySelectorAll(".hextra-sidebar-collapsible-trigger");
  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCollapsibleItem(trigger);
    });
  });

  const buttons = document.querySelectorAll(".hextra-sidebar-collapsible-button");
  buttons.forEach(function (button) {
    // Skip chevrons inside the custom button rows above; those rows already handle the click.
    if (button.closest(".hextra-sidebar-collapsible-trigger")) {
      return;
    }

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleCollapsibleItem(button);
    });
  });
}

function scrollToActiveItem() {
  const sidebarScrollbar = document.querySelector("aside.hextra-sidebar-container > .hextra-scrollbar");
  const activeItems = document.querySelectorAll(".hextra-sidebar-active-item");
  const visibleActiveItem = Array.from(activeItems).find(function (activeItem) {
    return activeItem.getBoundingClientRect().height > 0;
  });

  if (!visibleActiveItem) {
    return;
  }

  const yOffset = visibleActiveItem.clientHeight;
  const yDistance = visibleActiveItem.getBoundingClientRect().top - sidebarScrollbar.getBoundingClientRect().top;
  sidebarScrollbar.scrollTo({
    behavior: "instant",
    top: yDistance - yOffset
  });
}