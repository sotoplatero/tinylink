module.exports = {
    isType: (link) => {
        
        if (/^https\:\/\/(formspree|formkeep|getform)\..{2,3}\/f\//.test(link) || /^https\:\/\/submit-form\.com\//.test(link)) {
            return 'form'
        }

        if ( /\.(jpg|png|gif)$/.test(link) ) {
            return 'img' 
        }  
        
        if ( /\.pdf$/.test(link)  ) return 'pdf'
        
        if ( /^http(s)?\:\/\//.test(link) && typeof link === 'string' ) {
            return 'link' 
        } 

        return 'text' 
    },

}