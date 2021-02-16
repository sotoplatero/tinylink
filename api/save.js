const { v4: uuidv4 } = require('uuid');
const { Octokit } = require("@octokit/rest");
var slug = require('slug')

exports.handler = async (event) => {

  let profile = JSON.parse( event.body )
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  profile = { 
    id: profile.id || uuidv4(), 
    slug: slug(profile.name), 
    ...profile 
  };

  let options = {
    owner: 'sotoplatero',
    repo: 'db',
    path: 'tinylink.json',
  };

  const {data} = await octokit.repos.getContent(options)
  
  let content = Buffer.from( data.content, 'base64' ).toString('utf8');
  let tinylink = JSON.parse(content);
  let existProfileIndex = tinylink.findIndex(el => el.id === profile.id )
  
  if ( existProfileIndex !== -1 ){
	  tinylink.splice( existProfileIndex, 1, profile )
  } else {
	  tinylink = [...tinylink, profile ];
	}

  var fileContent = Buffer.from( JSON.stringify(tinylink), 'utf8' ).toString('base64') 
console.log(data.sha )
  await octokit.repos.createOrUpdateFileContents({ 
    ...options, 
    message: '+',
    content: fileContent,
    sha: data.sha 
  })

  return {
    statusCode: 200,
    body: JSON.stringify(profile)
  };      


}
