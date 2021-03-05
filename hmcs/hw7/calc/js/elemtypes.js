class BUTTON {
    constructor(inner){
        this.type = 'button';
        this.settings = {
            innerHTML: inner,
            className: 'cad',
            valuetype: 'digit'
        }
    };

    createTagFromMe(){
        let element = document.createElement(this.type);
        Object.entries(this.settings).forEach(attr =>{
            element[attr[0]] = attr[1];
            element.setAttribute('valuetype', this.settings.valuetype);
        })
        return element
    }
}


 

const DIGITS = [7,8,9,'*',4,5,6,'-',1,2,3,'+',0,'(',')','='];
const SIGNS = ['=','+','-','/','*'];
const CONTROLS = [];
