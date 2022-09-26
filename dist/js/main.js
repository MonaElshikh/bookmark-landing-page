"use strict";
const logo = document.querySelector(".logo");
const toggleIcon = document.querySelector(".menu img");
const aside = document.querySelector(".menu ul");
const closeMenu = document.querySelector(".menu ul > li > img:nth-child(2");
const tabs = Array.from(document.querySelectorAll(".tabs > li "));
const panels = Array.from(document.querySelectorAll(".tab-content"));
const questions = Array.from(document.querySelectorAll(".question"));
const arrowImages = Array.from(document.querySelectorAll(".question>.head>img"));
const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const email = document.querySelector(".contact-mail> input");
const execMark = document.querySelector(".contact-mail> span:nth-child(3");
const errorMesg = document.querySelector(".contact-mail> span:nth-child(4");
function clearActiveStyle(list, imgsList) {
    list === null || list === void 0 ? void 0 : list.forEach((item) => {
        item.classList.remove("active");
    });
    if (imgsList !== undefined) {
        imgsList.forEach((img) => {
            img.src = "./src/assets/images/icon-arrow.svg";
        });
    }
}
function toggle() {
    toggleIcon === null || toggleIcon === void 0 ? void 0 : toggleIcon.addEventListener("click", () => {
        aside.style.right = "0";
        toggleIcon.style.opacity = "0";
        logo.style.opacity = "0";
    });
}
function closeTopMenu() {
    closeMenu === null || closeMenu === void 0 ? void 0 : closeMenu.addEventListener("click", () => {
        aside.style.right = "100%";
        toggleIcon.style.opacity = "1";
        logo.style.opacity = "1";
    });
}
function toggleFeatures() {
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", (e) => {
            clearActiveStyle(e.target.parentElement.parentElement.querySelectorAll("li > span"));
            tab.querySelector(".tabs > li > span").classList.add("active");
            clearActiveStyle(panels);
            panels[index].classList.add("active");
        });
    });
}
function toggleFAQ() {
    questions.forEach((question) => {
        question.addEventListener("click", (e) => {
            clearActiveStyle(questions, arrowImages);
            question.classList.add("active");
            question.querySelector(".head > img").src =
                "./src/assets/images/up-arrow_icon.svg";
        });
    });
}
function closeAllFAQ() {
    document.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!e.target.parentNode.classList.contains("head") &&
            !e.target.parentNode.classList.contains("content") &&
            !e.target.parentNode.classList.contains("question")) {
            clearActiveStyle(questions, arrowImages);
        }
    });
}
function validateEmail() {
    email === null || email === void 0 ? void 0 : email.addEventListener("blur", () => {
        if (email.value.match(validate)) {
            execMark.classList.remove("d-flex");
            execMark.classList.add("hide");
            errorMesg.classList.add("hide");
            email.classList.remove("error");
            return true;
        }
        else {
            email.classList.add("error");
            execMark.className = "d-flex";
            errorMesg.classList.remove("hide");
            errorMesg.style.display = "block";
            return false;
        }
    });
}
toggle();
closeTopMenu();
toggleFeatures();
toggleFAQ();
closeAllFAQ();
validateEmail();

//# sourceMappingURL=main.js.map
