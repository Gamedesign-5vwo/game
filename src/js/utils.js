/**
 * Removes all children of the given element
 * @param {Element} elem
 */
export function removeAllChildren(elem) {
    if (elem) {
        var range = document.createRange();
        range.selectNodeContents(elem);
        range.deleteContents();
    }
}