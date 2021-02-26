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
    slug: profile.slug || slug(profile.name), 
    ...profile 
  };

  let options = {
    owner: 'sotoplatero',
    repo: 'db',
    path: 'profiles.json',
  };

  const {data} = await octokit.repos.getContent(options)
  
  let content = Buffer.from( data.content, 'base64' ).toString('utf8');
  let profiles = JSON.parse(content);
  let existProfileIndex = profiles.findIndex(el => el.email === profile.email )
  
  if ( existProfileIndex !== -1 ){
	  profiles.splice( existProfileIndex, 1, profile )
  } else {
	  profiles = [...profiles, profile ];
	}

  var fileContent = Buffer.from( JSON.stringify(profiles), 'utf8' ).toString('base64') 
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
