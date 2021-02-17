const got = require("got");
// const metascraper = require('metascraper')([
//     require('metascraper-author')(),
//     require('metascraper-description')(),
//     require('metascraper-image')(),
//     require('metascraper-logo')(),
//     require('metascraper-clearbit')(),
//     require('metascraper-publisher')(),
//     require('metascraper-title')(),
//     require('metascraper-url')()
//   ])


exports.handler = async function(event, context) {

    const parameters = event.queryStringParameters;

    try {
      const response = await got(`https://api.microlink.io/?url=${parameters.url}`)
      const {data} = await response.json()
      
      link = {
          url: data.url,
          title: data.author || data.title,
          publisher: data.publisher,
          logo: data.logo.url,
          avatar: data.image?.url,
      };

      return {
          headers: { 
              'Content-Type':'application/json' , 
          },    
          statusCode: 200,
          body: JSON.stringify(link)
      } 

  } catch (error) {
    return {
      statusCode: 400,
      body: 'Not Found'
    }     
    
  }


}
