declare module "css-has-pseudo/browser" {
  declare const browserPolyfill: (document: Document) => void;
  export default browserPolyfill;
}
