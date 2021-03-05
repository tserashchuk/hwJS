function createButton(elems, pattern){
    let buttonsArray = [];
    let htmlElemsArray = [];
    elems.forEach(element => {
        buttonsArray.push(new pattern(element));
    });
    for (element of buttonsArray) {
        let resultElem = document.createElement(element.type);
        Object.entries(element.settings).forEach(attr =>{
            resultElem[attr[0]] = attr[1];
            resultElem.setAttribute('valuetype', 'sdf');
        })
        htmlElemsArray.push(resultElem)
    }
    return htmlElemsArray
}


function allChildsAppend(perent, elems) {
    elems.forEach(element => {
        perent.append(element)
    })

}