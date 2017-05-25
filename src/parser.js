import $ from 'cheerio';

export default function parse(data) {
  const dom = $.load(data);
  const lists = dom('ul.itemizedlist')
    .map(function(idx, uls) {
      const children = $('li', uls).map((i, lis) =>
        $(lis)
          .text()
          .replace(/\s+/g, ' ')
          .trim()
      )
      .toArray();
      return children;
    })
    .toArray();

  const nodeExpression = (/Node\.js/);
  const sdkExpression = (/JavaScript/);
  const nodejs = lists.find(n => nodeExpression.test(n)).match(/(\d+\.\d+(?:\.\d+)?)/g);
  const awsSdk = lists.find(n => sdkExpression.test(n)).match(/(\d+\.\d+\.\d+)/)[1];
  return {
    nodejs,
    awsSdk,
  };
}
