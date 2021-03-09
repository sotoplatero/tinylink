let Parser = require('rss-parser');

exports.handler = async function(event, context) {

    let {url} = event.queryStringParameters;    

    // try {
        let parser = new Parser();
    
        let feed = await parser.parseURL(url);
        const lastPost = feed.items[0]

        const post = {
            site: feed.title,
            title: lastPost.title,
            content: lastPost.content.slice(0,240).replace(/(<([^>]+)>)/gi, "") + '...',
            url: lastPost.link,
            date: lastPost.updated,
        }

        return {
        headers: { 
            'Content-Type':'application/json' , 
        },    
        statusCode: 200,
        body: JSON.stringify(post)
        }   

  // } catch (error) {
  //   return {
  //     statusCode: 404,
  //     body: 'Not Found'
  //   }     
    
  // }


}
