const { v4: uuidv4 } = require('uuid');
const { Octokit } = require("@octokit/rest");
var slug = require('slug')

exports.handler = async (event) => {

//   let profile = JSON.parse( event.body )

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  let options = {
    owner: 'sotoplatero',
    repo: 'db',
    path: '',
  };
  
  // Get content JSON in repo
  const {data} = await octokit.repos.getContent(options)
  
  console.log(data)
//   let content = Buffer.from( data.content, 'base64' ).toString('utf8');
//   let tinylink = JSON.parse(content);
  
//   // Generate unique slug
//   let slugName = slug(profile.name)
//   const slugsFinded = tinylink.filter(el=> (el.slug===slugName) && (el.id != profile.id) )
//   profile = { 
//     id: profile.id || uuidv4(), 
//     ...profile, 
//     slug: slugsFinded.length ? slugName + '-' + (slugsFinded.length + 1) : slugName,
//   };
  
//   // Update or add Profile
//   let existProfileIndex = tinylink.findIndex(el => el.id === profile.id )
//   if ( existProfileIndex !== -1 ){
// 	  tinylink.splice( existProfileIndex, 1, profile )
//   } else {
// 	  tinylink = [...tinylink, profile ];
// 	}
  
//   // Update file in Repo
//   var fileContent = Buffer.from( JSON.stringify(tinylink), 'utf8' ).toString('base64') 
  
//   await octokit.repos.createOrUpdateFileContents({ 
//     ...options, 
//     message: '+',
//     content: fileContent,
//     sha: data.sha 
//   })

  return {
    statusCode: 200,
    body: JSON.stringify(1)
  };      


}
