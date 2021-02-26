module.exports = {
    isType: (link) => {
        
        if (/^https\:\/\/(formspree|formkeep|getform)\..{2,3}\/f\//.test(link) || /^https\:\/\/submit-form\.com\//.test(link)) {
            return 'form'
        }

        if ( !/^http(s)?\:\/\//.test(link) && typeof link === 'string' ) {
            return 'link' 
        } 
        
        if ( /\.(jpg|png|gif)$/.test(link) ) return 'img'   
        if ( typeof link === 'object' ) return 'obj'
        if ( /\.(pdf)$/.test(link)  ) return 'pdf'
    },

}