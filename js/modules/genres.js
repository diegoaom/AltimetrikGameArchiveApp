export const showGenres = (arr) => {
    let genres = [];
    for (let element of arr) {
        genres.push(element.name);
    }
    genres = genres.toString();
    genres = genres.replaceAll(',', ', ');
    return genres;
}

export const appendGenresTooltip = (arr) => {
    let genresToAppend = [];
    for (let element of arr) {
        genresToAppend += `
        <span class="genre-hover-text">${element.name}</span>
        `
    }
    return genresToAppend;

}