/**
 * @typedef {"KEYDOWN" | "KEYUP" | "MOUSEMOVE" | "MOUSEDOWN" | "MOUSEUP"}
 */
export let TInputType

/**
 * @typedef {"LEFT" | "MIDDLE" | "RIGHT"}
 */
export let TMouseButtonType

/**
 * @typedef {"KEY" | "MOUSEMOVE" | "MOUSECLICK" | "MOUSERELEASE"}
 */
export let TInputContextTypes

/**
 * @typedef
 * @prop {number} posX Current mouse position X
 * @prop {number} posY Current mouse position Y
 * @prop {number} clickX Last position the mouse got clicked X
 * @prop {number} clickY Last position the mouse got clicked Y
 * @prop {number} releaseX Last position the mouse got released X
 * @prop {number} releaseY Last position the mouse got released Y
 * @prop {boolean} isDown Represents if the left mouse button is currently down
 */
export let TMouseProps
