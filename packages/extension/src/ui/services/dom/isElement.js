export default function isElement(o) {
  return typeof HTMLElement === 'object'
    ? // eslint-disable-next-line no-undef
      o instanceof HTMLElement
    : o &&
        typeof o === 'object' &&
        o !== null &&
        o.nodeType === 1 &&
        typeof o.nodeName === 'string';
}
