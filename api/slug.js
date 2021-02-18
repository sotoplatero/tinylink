const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context) {

  let {slug} = event.queryStringParameters;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    let {data} = await octokit.repos.getContent({
      owner: 'sotoplatero',
      repo: 'db',
      path: 'tinylink.json',
    });
  
    let content = Buffer.from( data.content, 'base64' ).toString('utf8');
    let tinylink = JSON.parse(content);
  
    const profilesFinded = tinylink.filter(el=>el.slug===slug)
    if ( profilesFinded.length ) {
        const slug = slug + (profilesFinded.length + 1) 
    }

    return {
      headers: { 
          'Content-Type':'application/json' , 
      },    
      statusCode: 200,
      body: JSON.stringify(slug)
    }   

  } catch (error) {
    return {
      statusCode: 404,
      body: 'Not Found'
    }     
    
  }


}
