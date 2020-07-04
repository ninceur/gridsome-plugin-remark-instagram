const visit = require('unist-util-visit')
const axios = require('axios');
// TODO: look at using a template as this logic is getting fucked up. 
// Possible example without handlebars:
// https://github.com/Edmund1645/gridsome-plugin-blog-cover/blob/master/functions/generateHtml.js


let embedOptions = { width: 320, height: 320 };

async function getEmbedData(embedLink, options) {
  // For testing only accept a url, TODO: add additional API options via code commented out below
  // https://developers.facebook.com/docs/instagram/embedding/
  // const embedOptions = {
  //   url: embedLink,
  //   format: 'json'
  // }
  // const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
  // Use Axios to get data from embedLink value and save as embedData
  console.log("Entered embedData function with value " + embedLink);
  let embedData;
  await axios.get('https://api.instagram.com/oembed?url=http://instagram.com/p/' + embedLink + '?omitscript=true')
      .then(response => { embedData = response.data.html })
      .catch(error => console.log(error))  
  console.log("Exited Axios call, embedData is:\n " + embedData);
  return embedData;

}


module.exports = options => {

  const debug = options.debug ? console.log : () => {};
  
  return async function transform(tree) {
    visit(tree, 'image', async node => {
      const { alt = '', url = '' } = node;
      console.log("Alt tag " + alt + " URL: " + url);
      if (alt === 'instagram') {
        console.log('Saw the instagram alt tag');
        try {
          const embedData = await getEmbedData(url);
          console.log("Embed data not empty.");
          node.type = 'html';
          node.value = embedData;
          console.log("Node.value is " + node.value);
        } catch (err) {
          debug(`\nfailed to get html for ${url}\n`, err);
          }    
      }
    });
  }


};