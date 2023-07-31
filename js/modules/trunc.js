export let completeDescription = "";
const ellipsis = "...";
const readMoreBtn = '<button id="open-description" class="read-more">Read more</button>';

const calcUserDevice = () => {
    let userDevice = 3;

    if (document.body.clientWidth <= 768 && document.body.clientWidth >= 321) {
        userDevice = 2;
    }

    if (document.body.clientWidth <= 320) {
        userDevice = 1;
    }

    return userDevice;
}

const truncText = (text, charLength) => {

    if (text.length >= charLength) {
        let truncatedDescription = text.substring(0, charLength - 3)
        return truncatedDescription + ellipsis + readMoreBtn;
    }

}

export const truncDescription = (gameObj) => {
    let userDevice = calcUserDevice();

    completeDescription = gameObj.description_raw;

    if (userDevice === 3) {
        return truncText(completeDescription, 313);
    } else if (userDevice === 2) {
        return truncText(completeDescription, 334);
    } else if (userDevice === 1) {
        return truncText(completeDescription, 334);
    }

}

export const truncDescriptionSingleColumn = (gameObj) => {

    completeDescription = gameObj.description_raw;

    if (completeDescription.length >= 430) {
        let truncatedDescription = completeDescription.substring(0, 430)
        return truncatedDescription + ellipsis;
    } else {
        return completeDescription;
    }
}