// ================================
//  HORIZONTAL SCROLL CAROUSELS
// ================================
function initScrollCarousel(containerId) {
  const scroll = document.getElementById(containerId);
  if (!scroll) return;

  const wrapper = scroll.parentElement;

  // add scroll buttons
  const leftBtn  = document.createElement("button");
  const rightBtn = document.createElement("button");

  leftBtn.className  = "scroll-btn left";
  rightBtn.className = "scroll-btn right";
  leftBtn.innerHTML  = "&#8592;";
  rightBtn.innerHTML = "&#8594;";

  wrapper.appendChild(leftBtn);
  wrapper.appendChild(rightBtn);

  // button click scroll
  rightBtn.addEventListener("click", () => {
    scroll.scrollBy({ left: 320, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    scroll.scrollBy({ left: -320, behavior: "smooth" });
  });

  // drag to scroll
  let isDown   = false;
  let startX   = 0;
  let scrollLeft = 0;

  scroll.addEventListener("mousedown", (e) => {
    isDown   = true;
    startX   = e.pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
    scroll.classList.add("dragging");
  });

  scroll.addEventListener("mouseleave", () => {
    isDown = false;
    scroll.classList.remove("dragging");
  });

  scroll.addEventListener("mouseup", () => {
    isDown = false;
    scroll.classList.remove("dragging");
  });

  scroll.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - scroll.offsetLeft;
    const walk = (x - startX) * 1.5;
    scroll.scrollLeft = scrollLeft - walk;
  });

  // touch support
  let touchStartX   = 0;
  let touchScrollLeft = 0;

  scroll.addEventListener("touchstart", (e) => {
    touchStartX    = e.touches[0].pageX;
    touchScrollLeft = scroll.scrollLeft;
  });

  scroll.addEventListener("touchmove", (e) => {
    const x    = e.touches[0].pageX;
    const walk = touchStartX - x;
    scroll.scrollLeft = touchScrollLeft + walk;
  });

  // auto scroll — pause on hover
  let autoScroll = setInterval(() => {
    if (scroll.matches(":hover")) return;
    scroll.scrollLeft += 1;

    // reset to start when reached end
    if (scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth) {
      scroll.scrollLeft = 0;
    }
  }, 20);

  // show/hide buttons based on scroll position
  function updateButtons() {
    leftBtn.style.opacity  = scroll.scrollLeft > 0 ? "1" : "0.3";
    rightBtn.style.opacity =
      scroll.scrollLeft < scroll.scrollWidth - scroll.clientWidth - 10
        ? "1"
        : "0.3";
  }

  scroll.addEventListener("scroll", updateButtons);
  updateButtons();
}


// ================================
//  INIT CAROUSELS AFTER
//  SANITY LOADS CARDS
// ================================
window.initCarousels = function () {
  initScrollCarousel("githubCardsContainer");
  initScrollCarousel("aiCardsContainer");
};