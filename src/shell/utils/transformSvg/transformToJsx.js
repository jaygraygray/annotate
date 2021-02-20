import cheerio from 'cheerio';
import reactifyAttribute from 'react-attr-converter';
import toInlineSvg from './inlineSvgTransform';


const cheerioOptions = {
  xmlMode: true
};

// See docs in README.
//
// _skipOptimization is an internal option used to pass
// already-inlined-and-optimized SVGs into this.
function toJsx(svg, options) {
  options = options || {};
  return Promise.resolve()
    .then(() => {
      if (options._skipOptimization) return svg;
      return toInlineSvg(svg, options);
    })
    .then(({ data }) => {
      const $ = cheerio.load(data, cheerioOptions);
      $('*').each((i, el) => {
        el.attribs = Object.keys(el.attribs).reduce((result, name) => {
          result[reactifyAttribute(name)] = el.attribs[name];
          return result;
        }, {});
      });
      const inlineSvgWithReactAttributes = $.xml();
      const jsx = inlineSvgWithReactAttributes
        // Handle some unwanted conversion to HTML character entities.
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
      return jsx;
    }).catch(e => {
      if (e) {
        console.log(">>>>>>>>error", e);
      }
    });
}

export default toJsx;
