const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context) {

  let {email} = event.queryStringParameters;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    let {data} = await octokit.repos.getContent({
      owner: 'sotoplatero',
      repo: 'db',
      path: 'profiles.json',
    });
  
    let content = Buffer.from( data.content, 'base64' ).toString('utf8');
    let profiles = JSON.parse(content);
  
    const {profile} = profiles.find(el=>el.email===email)

    return {
      headers: { 
          'Content-Type':'application/json' , 
      },    
      statusCode: 200,
      body: JSON.stringify(profile)
    }   

  } catch (error) {
    return {
      statusCode: 404,
      body: 'Not Found'
    }     
    
  }


}
