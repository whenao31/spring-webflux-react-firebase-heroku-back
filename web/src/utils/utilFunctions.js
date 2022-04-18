export const findSuggestions = ( text, searchTerm ) => {
    /*
    text: text where to find searchTerm coincidences
    searchTerm: term to be matched on the text 
    */
    
    // create a regular expression to be matched
    const searchRegex = new RegExp(searchTerm.toLowerCase().trim(" "), "g");
    let suggestions = []; 
    let dummy = null;
    while(dummy = searchRegex.exec(text.toLowerCase().trim(" "))){
        if (text.indexOf(' ', dummy.index) === -1){
            suggestions.push(text.substring(text.substring(0,dummy.index).lastIndexOf(' ') + 1, text.length))
            continue;
        }
        suggestions.push(text.substring(text.substring(0,dummy.index).lastIndexOf(' ') + 1, text.indexOf(' ', dummy.index)));
    }
    return suggestions;
}