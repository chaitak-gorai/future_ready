// navmenu
(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);
  function showNavMenu() {
    navMenu.classList.add("open");
    // bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    // bodyScrollingToggle();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        // event.preventDefault();
        const hash = event.target.hash;
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        if (navMenu.classList.contains("open")) {
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("hover-in-shadow", "outer-shadow");
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              item.classList.add("active", "inner-shadow");
              item.classList.remove("hover-in-shadow", "outer-shadow");
            }
          });
          fadeOutEffect();
        }
        // window.location.hash = hash;
      }
    }
  });
})();
// about section tabs

(() => {
  const aboutSection = document.querySelector(".about-section");
  tabsContainer = document.querySelector(".about-tabs");
  tabsContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("active", "outer-shadow");
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

//fetchings project data prom project.js
function showProjectsData() {
  const itemsDiv = document.querySelector(".portfolio-items");
  let content = data.map((pjt) => {
    return `
    <div class="portfolio-item ${pjt.visible}" data-category="${pjt.category}">
    <div class="portfolio-item-inner">
      <div class="portfolio-item-img">
        <img
          src="${pjt.image}"
          alt="portfolio"
          data-screenshots="${pjt.ss}"
        />
        <!-- view project button -->
        <span class="view-project">view project</span>
      </div>
      <p class="portfolio-item-title">${pjt.title}</p>
      <!-- items-details -->
      <div class="portfolio-item-details">
        <div class="row">
          <div class="description">
            <h3>${pjt.brief}</h3>
            <p>
            ${pjt.about}
            </p>
          </div>
          <div class="info">
            <ul>
              <li>Date- <span>${pjt.date}</span></li>
              <li>Client- <span>xyz</span></li>
              <li>Tools- <span>${pjt.tools}</span></li>
              <li>
                Web- <span><a href="#">${pjt.link}</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
  });
  content = content.join(" ");
  itemsDiv.innerHTML = content;
}
showProjectsData();
//portfolio filter

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;
  //filter items

  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("outer-shadow", "active");
      const target = event.target.getAttribute("data-target");

      // portfolioItems.forEach((item) => {
      //   if (target === item.getAttribute("data-category") || target === "all") {
      //     item.classList.remove("hide");
      //     item.classList.add("show");
      //   } else {
      //     item.classList.remove("show");
      //     item.classList.add("hide");
      //   }
      // });
      data.map((pjt) => {
        if (target === pjt.category || target === "all") {
          pjt.visible = "show";
        } else {
          pjt.visible = "hide";
        }
      });
      showProjectsData();
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      //  get item index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      console.log(itemIndex);

      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // convert ss into Array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  });
  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }
  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    popup.querySelector(".pp-loader").classList.add("active");

    popupImg.src = imgSrc;
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + "of" + screenshots.length;
  }

  // next slideshow
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex = slideIndex + 1;
    }
    popupSlideShow();
  });
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  });
  showProjectsData();
  function popupDetails() {
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";
    const details = `      <div class="row">
    <div class="description">
      <h3>${data[itemIndex].brief}</h3>
      <p>
      ${data[itemIndex].about}
      </p>
    </div>
    <div class="info">
      <ul>
        <li>Date- <span>${data[itemIndex].date}</span></li>
        <li>Client- <span>xyz</span></li>
        <li>Tools- <span>${data[itemIndex].tools}</span></li>
        <li>
          Web- <span><a href="${data[itemIndex].link}">View Project</a></span>
        </li>
      </ul>
    </div>
  </div>`;
    popup.querySelector(".pp-project-details").innerHTML = details;
    // const title = portfolioItems[itemIndex].querySelector(
    //   ".portfolio-item-title"
    // ).innerHTML;
    const title = data[itemIndex].title;
    popup.querySelector(".pp-title h2").innerHTML = title;
    const category = data[itemIndex].category;
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }
  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });
  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

// testimonial

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");

  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  sliderContainer.style.width = slideWidth * slides.length + "px";
  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");
    slides[slideIndex].classList.add("active");
    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();

// hide aall sections

// (() => {
//   const sections = document.querySelectorAll(".section");
//   sections.forEach((section) => {
//     if (!section.classList.contains("active")) {
//       section.classList.add("hide");
//     }
//   });
// })();
function preloader() {
  window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 600);
  });
}
preloader();

var typed = new Typed("#typed", {
  strings: [
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer",
    "Student",
    "Cloud Enthusiast",
    "Competitive Coder",
    "Web Developer"
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
  backDelay: 900,
  loopCount: 1000
});
