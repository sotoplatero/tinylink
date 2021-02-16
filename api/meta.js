const got = require("got");
const metascraper = require('metascraper')([
    require('metascraper-author')(),
    require('metascraper-description')(),
    require('metascraper-image')(),
    require('metascraper-logo')(),
    require('metascraper-clearbit')(),
    require('metascraper-publisher')(),
    require('metascraper-title')(),
    require('metascraper-url')()
  ])


exports.handler = async function(event, context) {

    const parameters = event.queryStringParameters;

    (async () => {
        const { body: html, url } = await got( parameters.url )
        const metadata = await metascraper({ html, url })
        console.log(metadata)
    })()
  
    try {


        return {
            headers: { 
                'Content-Type':'application/json' , 
            },    
            statusCode: 200,
            body: JSON.stringify(ok)
        } 

  } catch (error) {
    return {
      statusCode: 400,
      body: 'Not Found'
    }     
    
  }


}
