const anchors = document.querySelectorAll("[data-scroll]");

anchors &&
  anchors.forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
