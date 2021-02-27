const got = require("got");
const fetch = require('node-fetch');
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

  const { isUrl } = require('@metascraper/helpers')

  

exports.handler = async function(event, context) {

    const parameters = event.queryStringParameters;

    try {
    //   const response = await got(`https://api.microlink.io/?url=${parameters.url}`)
    //   const {data} = await response.json()


      
    //   link = {
    //       url: data.url,
    //       title: data.author || data.title,
    //       publisher: data.publisher,
    //       logo: data.logo.url,
    //       avatar: data.image?.url,
    //   };

    let parameters = event.queryStringParameters;    
      const targetUrl = 'https://nodejs.org/en/knowledge/HTTP/clients/how-to-create-a-HTTP-request/'
      
      (async () => {
          try{
            const response = await fetch(targetUrl)
            console.log(response)
            // const metadata = await metascraper({ html, url })
            //   console.log(metadata  )

          } catch (e) {
              console.log(e)
          }
      })()      

      return {
          headers: { 
              'Content-Type':'application/json' , 
          },    
          statusCode: 200,
          body: JSON.stringify('ok')
      } 

  } catch (error) {
    console.log(error)
  }


}
