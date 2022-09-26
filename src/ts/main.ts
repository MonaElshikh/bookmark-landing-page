//#region  Declaration
//Header
const logo = document.querySelector(".logo") as HTMLDivElement;
const toggleIcon = document.querySelector(".menu img") as HTMLImageElement;
const aside = document.querySelector(".menu ul") as HTMLUListElement;
const closeMenu = document.querySelector(".menu ul > li > img:nth-child(2");
// Features
const tabs = Array.from(
  document.querySelectorAll(".tabs > li ")
) as HTMLUListElement[];
const panels = Array.from(
  document.querySelectorAll(".tab-content")
) as HTMLDivElement[];
// Questions
const questions = Array.from(
  document.querySelectorAll(".question")
) as HTMLDivElement[];
const arrowImages = Array.from(
  document.querySelectorAll(".question>.head>img")
) as HTMLImageElement[];
// Contact
const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const email = document.querySelector(
  ".contact-mail> input"
) as HTMLInputElement;
const execMark = document.querySelector(
  ".contact-mail> span:nth-child(3"
) as HTMLSpanElement;
const errorMesg = document.querySelector(
  ".contact-mail> span:nth-child(4"
) as HTMLSpanElement;
//#endregion
//#region  Functions
// General
function clearActiveStyle(
  list?: HTMLSpanElement[] | HTMLDivElement[] | [],
  imgsList?: HTMLImageElement[]
) {
  list?.forEach((item: HTMLSpanElement | HTMLDivElement) => {
    item.classList.remove("active");
  });
  if (imgsList !== undefined) {
    imgsList.forEach((img) => {
      img.src = "./src/assets/images/icon-arrow.svg";
    });
  }
}
// Header
function toggle() {
  toggleIcon?.addEventListener("click", () => {
    aside.style.right = "0";
    toggleIcon.style.opacity = "0";
    logo.style.opacity = "0";
  });
}
function closeTopMenu() {
  closeMenu?.addEventListener("click", () => {
    aside.style.right = "100%";
    toggleIcon.style.opacity = "1";
    logo.style.opacity = "1";
  });
}
// Features
function toggleFeatures() {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e: any) => {
      clearActiveStyle(
        e.target.parentElement.parentElement.querySelectorAll("li > span")
      );
      (tab.querySelector(".tabs > li > span") as HTMLSpanElement).classList.add(
        "active"
      );
      clearActiveStyle(panels);
      panels[index].classList.add("active");
    });
  });
}
// FAQ
function toggleFAQ() {
  questions.forEach((question) => {
    question.addEventListener("click", (e) => {
      clearActiveStyle(questions, arrowImages);
      question.classList.add("active");
      (question.querySelector(".head > img") as HTMLImageElement).src =
        "./src/assets/images/up-arrow_icon.svg";
    });
  });
}
function closeAllFAQ() {
  document.addEventListener("click", (e: any) => {
    e.stopPropagation();
    if (
      !e.target.parentNode.classList.contains("head") &&
      !e.target.parentNode.classList.contains("content") &&
      !e.target.parentNode.classList.contains("question")
    ) {
      clearActiveStyle(questions, arrowImages);
    }
  });
}
// Contact
function validateEmail() {
  email?.addEventListener("blur", () => {
    if (email.value.match(validate)) {
      execMark.classList.remove("d-flex");
      execMark.classList.add("hide");
      errorMesg.classList.add("hide");
      email.classList.remove("error");
      return true;
    } else {
      email.classList.add("error");
      execMark.className = "d-flex";
      errorMesg.classList.remove("hide");
      errorMesg.style.display = "block";
      return false;
    }
  });
}
//#endregion
//#region  Calls
toggle();
closeTopMenu();
toggleFeatures();
toggleFAQ();
closeAllFAQ();
validateEmail();
//#endregion
