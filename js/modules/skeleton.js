import { cardContainer } from "../index.js";

const skeletonLoader = document.querySelector("#skeleton-loader");

const skeletonMaker = (quantity, location) => {

    const skeleton = document.querySelector("#skeleton-template");

    for (let i = 0; i < quantity; i++) {
        location.appendChild(skeleton.cloneNode(true));
    };

};

export const skeletonPlacer = () => {

    if (document.body.clientWidth <= 320) {
        skeletonMaker(2, cardContainer);
        skeletonMaker(1, skeletonLoader);
    } else if (document.body.clientWidth <= 768) {
        skeletonMaker(7, cardContainer);
        skeletonMaker(2, skeletonLoader);
    } else {
        skeletonMaker(8, cardContainer);
        skeletonMaker(3, skeletonLoader);
    }

}

export const showSkeletonLoader = () => {
    document.querySelector("#skeleton-loader").style.display = "flex";
}

export const hideSkeletonLoader = () => {
    document.querySelector("#skeleton-loader").style.display = "none";
}