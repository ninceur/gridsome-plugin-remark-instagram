# Gridsome Remark Instagram Plugin

This is a plugin for [Gridsome](https://gridsome.org/)'s chosen markdown engine, [Remark](https://remark.js.org/), which allows you to embed individual Instagram posts into markdown files. Current status: In testing, DOES NOT WORK YET. Do not use in production sites.

## Loading

```js
module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/**/*.md',
        route: '/blog/:year/:month/:day/:slug',
        remark: {
          plugins: [
            ['gridsome-plugin-remark-instagram']
          ]
        }
      }
    }
  ]
}
```

## Usage

This plugin follows the [Gatsby Instagram plugin's formatting](https://github.com/pamo/gatsby-remark-instagram-embed) of using Markdown image tags with the alt text of "instagram" to load sources.

`![instagram](postString)`

## Output

Output is still in testing. Intended method is to query the Instagram API, via Axios, get the response.data.html entry from the JSON response, and set the node.value to the HTML response using unist-util-visit with visit() to traverse the markdown tree.

Currently the API query __works__ but the image tag does not correctly get replaced by the HTML. 


This is how the video should appear on the screen:

## License

MIT

## Credit

The syntax for the markdown embed comes from the [Gatsby plugin](https://github.com/pamo/gatsby-remark-instagram-embed). For converting to Gridsome I heavily referenced the [Gridsome Twitter Remark Plugin](https://github.com/danvega/gridsome-plugin-remark-twitter) and the [Youtube remark plugin](https://github.com/ntwcklng/gatsby-remark-embed-youtube
).

