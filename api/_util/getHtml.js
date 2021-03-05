const chromium = require('chrome-aws-lambda');

export default async (url) => {
    const browser = await chromium.puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: process.env.PATH_CHROME || await chromium.executablePath,
        headless: true,
    });
    
    // Open page base
    const page = await browser.newPage(); 
    await page.goto(url);   
    let html = await page.content();
    
    return html
}