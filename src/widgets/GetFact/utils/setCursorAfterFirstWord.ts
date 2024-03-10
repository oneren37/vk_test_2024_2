export function setCursorAfterFirstWord(textarea: HTMLTextAreaElement) {
    const text = textarea.value;
    const firstSpaceIndex = text.indexOf(' ');

    textarea.selectionStart = firstSpaceIndex === -1 ? text.length : firstSpaceIndex;
    textarea.selectionEnd = textarea.selectionStart;
    textarea.focus();
}