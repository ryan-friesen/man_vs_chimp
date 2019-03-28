const selfClosingTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];

// return as str primarily used for building an elem str to be passed as innerHTML arg
function elemBuilder(returnAsStr, elemTag, attrs = {}, innerHTML = "") {

    let elem = `<${elemTag}`;

    if (!jQuery.isEmptyObject(attrs) || !attrs) {

        elem += ' ';

        for (let key in attrs) {
            elem += `${key}="${attrs[key]}"`;
        }
    }

    elem += ">"

    if (selfClosingTags.includes(elemTag) === false) {
        elem += `${innerHTML}</${elemTag}>`;
    }
    return returnAsStr ? elem : $(elem);
}

// inclusive min, exclusive max
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}