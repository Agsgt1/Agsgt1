//========//
// COLOUR //
//========//
/**
 * Convert a colour to a hex string.
 * @param {[number, number, number, number?]} colour
 */
export function toHex([red, green, blue, alpha = 255]) {
  return [red, green, blue, alpha]
    .map((v) => v?.toString(16).padStart(2, "0"))
    .join("");
}

export const GREEN = [70, 255, 128];
export const CYAN = [70, 204, 255];
export const BLUE = [70, 128, 255];
export const PURPLE = [128, 67, 255];
export const PINK = [255, 128, 222];
export const CORAL = [255, 128, 128];
export const RED = [255, 67, 70];
export const ORANGE = [255, 128, 70];
export const YELLOW = [255, 255, 70];

/** All monochrome colours. */
export const SHADES = [
  [6, 7, 10], //VOID
  [14, 16, 22],
  [24, 29, 39], //BLACK
  [33, 39, 53], //DARK_GREY
  [47, 56, 75],
  [55, 67, 98], //GREY
  [87, 101, 147], //LIGHT_GREY
  [135, 146, 171],
  [159, 174, 204], //SILVER
  [224, 224, 224],
  [255, 255, 255], //WHITE
];

export const VOID = SHADES[0];
export const BLACK = SHADES[2];
export const GREY = SHADES[5];
export const SILVER = SHADES[8];
export const WHITE = SHADES[10];

export const HUES = [
  GREEN,
  CYAN,
  BLUE,
  PURPLE,
  PINK,
  CORAL,
  RED,
  ORANGE,
  YELLOW,
];

export const COLOURS = [...SHADES, ...HUES];

//=========//
// CONSOLE //
//=========//
export const print = console.log.bind(console);

export function registerDotDee() {
  Reflect.defineProperty(Object.prototype, "d", {
    get() {
      const value = this.valueOf();
      console.log(value);
      return value;
    },
    set(value) {
      Reflect.defineProperty(this, "d", {
        value,
        configurable: true,
        writable: true,

  /**
   * @param {StateNode | null} state
   */
  transition(state) {
    const previous = this.child;
    const next = state;

    if (previous === next) {
      throw new Error("Can't transition to the same state.");
    }

    if (next?.parent) {
      throw new Error("Can't transition to a state that already has a parent.");
    }

    if (next) next.parent = this;
    this.child = next;

    // Fire the exit event! If it causes a transition, stop there.
    previous?.fire("exit", { previous, next });
    if (this.child !== next) return;

    // Otherwise, carry on with the enter event!
    next?.fire("enter", { previous, next });
  }
}

//=====//
// SVG //
//=====//
/**
 * Create an SVG element.
 * @param {string} tag
 * @param {Record<string, string>} attributes
 * @param {(Node)[]} children
 */
export function SVG(tag, attributes, children = []) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  for (const child of children) {
    element.append(child);
  }
  return element;
}

//=========//
// VECTOR2 //
//=========//
export const Vector2D = {
  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {[number, number]}
   */
  add([ax, ay], [bx, by]) {
    return [ax + bx, ay + by];
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {[number, number]}
   */
  subtract([ax, ay], [bx, by]) {
    return [ax - bx, ay - by];
  },

  /**
   * @param {[number, number]} a
   * @param {number} scalar
   * @returns {[number, number]}
   */
  multiply([x, y], scalar) {
    return [x * scalar, y * scalar];
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  dotProduct([ax, ay], [bx, by]) {
    return ax * bx + ay * by;
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  crossProduct([ax, ay], [bx, by]) {
    return ax * by - ay * bx;
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  distanceBetween([ax, ay], [bx, by]) {
    return Math.hypot(ax - bx, ay - by);
  },

  /**
   * @param {[number, number]} vector
   * @returns {number}
   */
  distance([x, y]) {
    return Math.hypot(x, y);
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  angleBetween([ax, ay], [bx, by]) {
    return Math.atan2(by - ay, bx - ax);
  },

  /**
   * @param {[number, number]} a
   * @param {number} angle
   * @param {[number, number]} [origin]
   * @returns {[number, number]}
   */
  rotate([x, y], angle, [ox, oy] = [0, 0]) {
    const dx = x - ox;
    const dy = y - oy;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [ox + dx * cos - dy * sin, oy + dx * sin + dy * cos];
  },

  /**
   * @param {[number, number]} vector
   * @returns {[number, number]}
   */
  normalise([x, y]) {
    const length = Math.hypot(x, y);
    return [x / length, y / length];
  },
};
