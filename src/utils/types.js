module.exports = {
    isContact: (link) => {
        return /^https\:\/\/(formspree|formkeep|getform)\..{2,3}\/f\//.test(link) || 
                /^https\:\/\/submit-form\.com\//.test(link) 
    },
    isTitle: (link) => {
        return ( !/^http(s)?\:\/\//.test(link) && typeof link === 'string' )    
    },
    isImg: (link) => {
        return ( /\.(jpg|png|gif)$/.test(link)  )    
    },
    isLink: (link) => {
        return ( typeof link === 'object' )    
    },

}