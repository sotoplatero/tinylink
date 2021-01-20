const chromium = require('chrome-aws-lambda');
const got = require("got");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');
const URL = require('url');
var dot = require("dot");

const localChrome = process.env.PATH_CHROME;

exports.handler = async (event, context) => {

    let {
        url,
        bg = '',
        color = '',
        size,
        theme = 'play',
        font,
    } = event.queryStringParameters;

    let [ bgfrom, bgto ] = bg.split('_');
    let [ colorfrom, colorto ] = color.split('_');

    if ( !url ) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'url parameter not defined' })
    }

    const { body } = await got( url );
    const $ = cheerio.load( body );

    // try {
        const resolved = path.resolve(__dirname, `./${theme}.html`)        
        let tmpl = fs.readFileSync( resolved, "utf8" );
        const view = dot.template(tmpl);

        const metas = { 
            title: $('title').first().text() , 
            description: $('meta[property="og:description"],meta[name="twitter:description"],meta[name="description"],meta[property="description"]').attr('content'), 
            date: $('meta[property*="updated_time" i],meta[property*="modified_time" i],meta[property*="published_time" i],meta[property*="release_date" i],meta[name="date" i],[itemprop*="datemodified" i],[itemprop="datepublished" i],[itemprop*="date" i]').attr('content'),            
            image: $('article img[src],#content img[src],img[src]').attr('src'),
            publisher: $('meta[property="og:site_name"],meta[name*="application-name" i],meta[property="al:android:app_name"],meta[property="al:iphone:app_name"],meta[property="al:ipad:app_name"],meta[name="publisher" i],meta[name="twitter:app:name:iphone"],meta[name="twitter:app:name:ipad"],meta[name="twitter:app:name:googleplay"]').attr('content'),
            size: size,
            bgto: bgto, 
            bgfrom: bgfrom, 
            colorto: colorto, 
            colorfrom: colorfrom, 
            font: font, 
            domain: URL.parse(url).hostname 
        };

        const content = view(metas)
        
        const browser = await chromium.puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: localChrome || await chromium.executablePath,
            headless: chromium.headless,
        });
        
        // Open page base
        const page = await browser.newPage();
        await page.setViewport({ width: 1536, height: 768 }); // relation 1/2
        await page.setContent( content ) ;
      
        // const card = await page.$('body');
        const screenshot = await page.screenshot({ encoding: 'base64' });
        await browser.close();

        return {
            statusCode: 200,
            headers: { 
            	'Content-type': 'image/jpeg', 
            },
            body: screenshot,   
            isBase64Encoded: true            
        }     

    // } catch (e) {

    //     return {
    //         headers: { 'Content-Type':'application/json'},            
    //         statusCode: 500,
    //         body: JSON.stringify({ message: 'Error' }),   
    //     }     

    // }
}
