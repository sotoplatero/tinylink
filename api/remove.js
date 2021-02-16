const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event, context) {

    let {id,index} = JSON.parse( event.body )

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  let {data} = await octokit.repos.getContent({
    owner: 'sotoplatero',
    repo: 'db',
    path: 'tinylink.json',
  });

  let content = Buffer.from( data.content, 'base64' ).toString('utf8');
  let tinylink = JSON.parse(content);

  const profile = tinylink.find(el=>el.slug===slug)

  return {
    headers: { 
        'Content-Type':'application/json' , 
    },    
    statusCode: 200,
    body: JSON.stringify(profile)
  }     

}
