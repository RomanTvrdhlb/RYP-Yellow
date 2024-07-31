import {
    toggleCustomClass,
    addCustomClass,
    removeCustomClass
} from "../functions/customFunctions.js";

let openedAccordion = null;

const getAccordions = function (accordionParrent, dataName) {
    return accordionParrent.querySelectorAll(`[${dataName}]`);
};

const closeAccordion = function (accordion, className = "active") {
    accordion.style.maxHeight = 0;
    removeCustomClass(accordion, className);
};

const openAccordion = function (accordion, className = "active", height = false) {
    accordion.style.maxHeight = height ? height : accordion.scrollHeight + "px";
    addCustomClass(accordion, className);
};

const toggleAccordionButton = function (button, className = "active") {
    toggleCustomClass(button, className);
};

const checkIsAccordionOpen = function (accordion) {
    return accordion.classList.contains("active");
};

const accordionClickHandler = function (e) {
    e.preventDefault();

    let currentDataNumber = this.getAttribute(`data-id`);
    let accordionParent = this.parentNode;

    toggleAccordionButton(this);
    const accordionContent = accordionParent.querySelector(`[data-content="${currentDataNumber}"]`
    );
    const isAccordionOpen = checkIsAccordionOpen(accordionContent);

    if (isAccordionOpen) {
        closeAccordion(accordionContent);
        openedAccordion = null;
    } else {
        if (openedAccordion != null) {
            const mobileSettings = () => {
                let containerWidth = document.documentElement.clientWidth;
                if (
                    containerWidth <= accordionParent.dataset.breakpoint &&
                    accordionParent.dataset.single === "true"
                ) {
                    closeAccordion(openedAccordion);
                    toggleAccordionButton(
                        accordionParent.querySelector(
                            `[data-id="${openedAccordion.getAttribute('data-content')}"]`
                        )
                    );
                }
            };

            window.addEventListener("resize", () => {
                mobileSettings();
            });
            mobileSettings();
        }

        openAccordion(accordionContent);
        openedAccordion = accordionContent;
    }
};

const activateAccordion = function (accordions, handler) {
    accordions.forEach((accordion) => {
        accordion.addEventListener("click", handler);
    });
};

const deactivateAccordion = function (accordions, handler) {
    accordions.forEach((accordion) => {
        accordion.removeEventListener("click", handler);
    });
};

const accordionDefaultOpen = function (accordionParent, currentId) {
    const defaultOpenContent = accordionParent.querySelector(
        `[data-content="${currentId}"]`
    );
    const defaultOpenButton = accordionParent.querySelector(
        `[data-id="${currentId}"]`
    );
    openedAccordion = defaultOpenContent;

    toggleAccordionButton(defaultOpenButton);
    openAccordion(defaultOpenContent);
};

export const accInit = (accParrents, dataBtn, dataContent) => {
    accParrents.forEach(function (accordionParent) {
        if (accordionParent) {
            let accordions = getAccordions(accordionParent, dataBtn);
            let defaultOpenSetting;

            if (accordionParent.dataset.default) {
                defaultOpenSetting = accordionParent.dataset.default;
                accordionDefaultOpen(accordionParent, defaultOpenSetting);
            }

            activateAccordion(accordions, accordionClickHandler);
        }
    });
};

export const accReinit = (accordionParent, dataBtn, dataContent) => {
    if (accordionParent) {
        let accordions = getAccordions(accordionParent, dataBtn);
        deactivateAccordion(accordions, accordionClickHandler);

        if (openedAccordion) {
            closeAccordion(openedAccordion);
            openedAccordion = null;
        }

        accInit([accordionParent], dataBtn, dataContent);
    }
};

addEventListener("DOMContentLoaded", (event) => {
    const accParrents = document.querySelectorAll('[data-accordion-init]');
    accInit(accParrents, "data-id", "data-content");
});

