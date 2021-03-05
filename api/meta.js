const got = require('got')
/* export our lambda function as named "handler" export */
const cheerio = require('cheerio');
exports.handler = async function(event, context) { 
    
    let {url} = event.queryStringParameters;
    
    const response = await got(url)
    const html = await response.body
    const $ = cheerio.load(html);

    const sel = {
        title: 'meta[property="og:title"],meta[name="twitter:title"]',
        description: 'meta[property="og:description"],meta[name="twitter:description"],meta[name="description"],meta[itemprop="description"]',
        publisher: 'meta[property="og:site_name"], meta[name*="application-name" i], meta[property="al:android:app_name"],meta[property="al:iphone:app_name"],meta[property="al:ipad:app_name"],meta[name="publisher" i],meta[name="twitter:app:name:iphone"],meta[name="twitter:app:name:ipad"],meta[name="twitter:app:name:googleplay"]',
        logo: 'meta[property="og:logo"],meta[itemprop="logo"]',
        image: 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]',
    }
    console.log($(sel.logo).attr('content'))
    const meta = {
        title: $(sel.title).attr('content'),
        description: $(sel.description).attr('content'),
        publisher: $(sel.publisher).attr('content'),
        logo: $(sel.logo).attr('content') ,
        image: $(sel.image).attr('content'),
    }

    return {
        headers: { 
            'Content-Type':'application/json' , 
        },    
        statusCode: 200,
        body: JSON.stringify(meta)
      }       

}

  