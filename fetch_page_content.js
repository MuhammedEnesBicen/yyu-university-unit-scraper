process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const BaseUrl = 'https://www.yyu.edu.tr/';
async function fetchAndParseHtml(url=BaseUrl) {
 let resultHtml;
    // Make a fetch request to the specified URL
   await fetch(url)
      .then((response) => {        
        return response.text();// When the page is loaded, convert it to text
      })
      .then((html) => {        
        // console.log(html);
        resultHtml= html;
      })
      .catch((err) => {
        console.error(`Failed to fetch page: ${url} \n error:`, err);
      });

      return resultHtml;
  }

  module.exports = {fetchAndParseHtml};