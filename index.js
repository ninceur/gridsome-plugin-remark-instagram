const visit = require('unist-util-visit')
const axios = require('axios');
// TODO: look at using a template as this logic is getting fucked up. 
// Possible example without handlebars:
// https://github.com/Edmund1645/gridsome-plugin-blog-cover/blob/master/functions/generateHtml.js


let embedOptions = { width: 320, height: 320 };

const getEmbedData = async (embedLink, options) => {
  // TODO: Update with Facebook's new oEmbed implementation.
  // Make a request using the Facebook IG Basic API
  // Data needed
  // Endpoint: GET /instagram_oembed
  // Needs App ID and clientAccessToken from Facebook developer app
  // Examples:
  // GET /instagram_oembed?url={url}&access_token={access-token}
  // curl -X GET 
  // "https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/fA9uwTtkSN/&access_token=IGQVJ..."
  // Additional info here https://developers.facebook.com/docs/instagram/oembed/



  console.log("Entered embedData function with value " + embedLink);
  let embedData;
  await axios.get('https://api.instagram.com/oembed?url=http://instagram.com/p/' + embedLink + '?omitscript=false')
      .then(response => { embedData = response.data.html })
      .catch(error => console.log(error))  
  console.log("Exited Axios call, embedData is:\n " + embedData);
  return await embedData;

};


module.exports = options => {

  const debug = options.debug ? console.log : () => {};
  
  return async tree => {
    visit(tree, 'image', async node => {
      const { alt = '', url = '' } = node;
      console.log("Alt tag " + alt + " URL: " + url);
      if (alt === 'instagram') {
        console.log('Saw the instagram alt tag');
        try {
          const embedData = await getEmbedData(url);
          console.log("Embed data not empty.");
          node.type = 'html';
          node.value = `<div><div>${embedData}</div></div>`;
          console.log("Node.value is " + node.value);
        } catch (err) {
          debug(`\nfailed to get html for ${url}\n`, err);
          }    
      }
    });
  };


};