const { Octokit } = require("@octokit/rest");

/* export our lambda function as named "handler" export */
exports.handler = async function(event) {

  let {id,index} = JSON.parse( event.body )

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  let options = {
    owner: 'sotoplatero',
    repo: 'db',
    path: 'tinylink.json',
  };
  
  let {data} = await octokit.repos.getContent(options);

  let content = Buffer.from( data.content, 'base64' ).toString('utf8');
  let tinylink = JSON.parse(content);

  const profile = tinylink.find( el => el.id === id )
  const profileIndex = tinylink.findIndex( el => el.id === id )
  profile.links.splice(index,1)
  tinylink.splice(profileIndex,1,profile)

  var fileContent = Buffer.from( JSON.stringify(tinylink), 'utf8' ).toString('base64') 

  await octokit.repos.createOrUpdateFileContents({ 
    ...options, 
    message: '+',
    content: fileContent,
    sha: data.sha 
  })  

  return {
    headers: { 
        'Content-Type':'application/json' , 
    },    
    statusCode: 200,
    body: JSON.stringify(profile)
  }     

}
