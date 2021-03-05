class Keyboard {

    constructor(lang, parentElem){
        this.lang = lang;
        this.caps = false;
        this.shift = false;
        this.parentElem = parentElem;
        this.appendToParent();


        let input = document.querySelector('#input');

        // this.defaultButton = this.defaultButton.bind(this);
    }

    createButtons() {
        const langSelector = {
                            'RU':[
                                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                                'caps','й','ц','у','к','е','н','г','ш','щ','з','х','ъ', 'enter','shift',
                                'ф','ы','в','а','п','р','о','л','д','ж','э',
                                'я','ч','с','м','и','т','ь','б','ю',
                                'lang','space'
                                ],
                            'EN':[
                                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                                'caps','q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'enter','shift',
                                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
                                'z', 'x', 'c', 'v', 'b', 'n', 'm',
                                'lang','space','left','right','down'
                                ]}
        let result = [];

        langSelector[this.lang].forEach(
           (buttonValue) =>{
                let elem = document.createElement('button');
                switch(buttonValue){
                    case 'backspace':
                        elem.innerHTML = '<span class="material-icons">backspace</span>';
                        elem.onclick = this.backspace;
                        break;
                    case 'space':
                        elem.innerHTML = '<span class="material-icons">space_bar</span>';
                        elem.onclick = this.space;
                        break;
                    case 'enter':
                        elem.innerHTML = '<span class="material-icons">subdirectory_arrow_left</span>';
                        elem.onclick = this.defaultButton;
                        break;
                    
                    case 'shift':
                        elem.innerHTML = 'SHIFT';
                        elem.onclick = this.defaultButton;
                        break;
                    
                    case 'caps':
                        elem.innerHTML = buttonValue;
                        elem.onclick = () => {this.caps = !this.caps; this.rewriteKeyboard();} // ЭТО ЗНАМЕНИТЫЕ ЗАМЫКАНИЯ?????
                        break;
                    
                    case 'lang':
                        elem.innerHTML = '<span class="material-icons">language</span>';
                        elem.onclick = this.defaultButton;
                        break;

                    case 'left':
                        elem.innerHTML = '<span class="material-icons">keyboard_arrow_left</span>';
                        elem.onclick = this.leftClick;
                        break;

                    case 'right':
                        elem.innerHTML = '<span class="material-icons">keyboard_arrow_right</span>';
                        elem.onclick = this.rightClick;
                        break;
                    case 'down':
                        elem.innerHTML = '<span class="material-icons">keyboard_arrow_down</span>';
                        elem.onclick = this.downClick;
                        break;
                    
                    default: 
                        elem.innerHTML = this.caps ? buttonValue.toUpperCase() : buttonValue.toLowerCase();
                        elem.onclick = this.defaultButton.bind(this); // крутотень
                        break;
                    }
                elem.classList.add('mdc-button','mdc-button--raised');
                result.push(elem);                
           })


    return result
    } // createbuttons---


    appendToParent(){
        let items = this.createButtons()
        items.forEach((item)=>{this.parentElem.appendChild(item)})
    }

    rewriteKeyboard(){
        this.parentElem.innerHTML='';
        this.appendToParent();
    }

    defaultButton(){
        console.log(this);
        let input = document.querySelector('#input');
        input.textContent += event.target.innerHTML;
        
    } 

    rightClick(){
        let input = document.querySelector('#input');
        input.focus()
        input.selectionEnd = input.selectionEnd+1;
        input.selectionStart = input.selectionStart+1;

    }

    leftClick(){
        let input = document.querySelector('#input');
        input.focus()
        input.selectionStart = input.selectionStart-1;
        input.selectionEnd = input.selectionEnd-1;
        console.log(input.cols)
    }

}
