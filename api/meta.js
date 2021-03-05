const chromium = require('chrome-aws-lambda');
const got = require('got');
const cheerio = require('cheerio');
const { parse } = require('tldts')
const autoDomains = require('./_util/auto-domains.json')

const getHtmlPptr = async url => {

    const browser = await chromium.puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.PATH_CHROME || await chromium.executablePath,
        headless: true,
    });
    
    const page = await browser.newPage(); 
    await page.goto(url);   
    let html = await page.content();
    
    return html;
}


const getHtml = async url => {
    const res = await got(url)
    return await res.body;
}


exports.handler = async function(event, context) { 
    
    let {url} = event.queryStringParameters;
    const { domain, domainWithoutSuffix } = parse(url)
    
    const isPrerender = autoDomains.includes( domainWithoutSuffix )
    const html = isPrerender ? await getHtmlPptr(url) : await getHtml(url);
    const $ = cheerio.load(html);

    const sel = {
        title: 'meta[property="og:title"],meta[name="twitter:title"]',
        description: 'meta[property="og:description"],meta[name="twitter:description"],meta[name="description"],meta[itemprop="description"]',
        publisher: 'meta[property="og:site_name"], meta[name*="application-name" i], meta[property="al:android:app_name"],meta[property="al:iphone:app_name"],meta[property="al:ipad:app_name"],meta[name="publisher" i],meta[name="twitter:app:name:iphone"],meta[name="twitter:app:name:ipad"],meta[name="twitter:app:name:googleplay"]',
        logo: 'meta[property="og:logo"],meta[itemprop="logo"]',
        image: 'meta[property="og:image:secure_url"],meta[property="og:image:url"],meta[property="og:image"],meta[name="twitter:image:src"],meta[name="twitter:image"],meta[itemprop="image"]',
    }

    const meta = {
        title: $(sel.title).attr('content'),
        description: $(sel.description).attr('content'),
        publisher: $(sel.publisher).attr('content') || domain,
        logo: $(sel.logo).attr('content') || `https://unavatar.now.sh/${domain}`,
        image: $(sel.image).attr('content') || `https://usecard.dsoto.dev/?url=${url}`,
    }

    return {
        headers: { 
            'Content-Type':'application/json' , 
        },    
        statusCode: 200,
        body: JSON.stringify(meta)
      }       

}

  