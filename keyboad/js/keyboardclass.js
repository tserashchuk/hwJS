class Keyboard {

    constructor(lang, parentElem) {
        this.lang = 'RU' || 'EN';
        this.caps = false;
        this.shift = false;
        this.parentElem = parentElem;
        this.appendToParent('RU');
       
        let input = document.querySelector('#input');

    }

    createButtons(lang) {
        const langSelector = {
            'RU': [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'enter', '?123',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э','caps',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю',
                'lang','left','right', 'space'
            ],
            'EN': [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'enter', '?123',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'caps',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', 
                'lang','left','right', 'space'
            ],

            'numeric': [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
                '@', '#', '$', '_', '&', '-', '+', '(', ')','ABC', '/',
                '*', '\"', '\'', ':', ';', '!', '?', 'left','right', 'space'
            ]
        }
        let result = [];

        langSelector[lang].forEach(
            (buttonValue) => {
                let elem = document.createElement('button');
                switch (buttonValue) {
                    case 'backspace':
                        elem.innerHTML = '<span class="material-icons">backspace</span>';
                        elem.onclick = this.backspace;
                        elem.classList.add('button-wide');
                        break;
                    case 'space':
                        elem.innerHTML = '<span class="material-icons">space_bar</span>';
                        elem.onclick = this.space;
                        elem.classList.add('space');
                        break;
                    case 'enter':
                        elem.innerHTML = '<span class="material-icons">subdirectory_arrow_left</span>';
                        elem.onclick = this.enter;
                        elem.classList.add('button-wide');
                        break;

                    case '?123':
                        elem.innerHTML = '<strong>?123</strong>';
                        elem.onclick = () => { this.rewriteKeyboard(true); }
                        break;

                    case 'ABC':
                        elem.innerHTML = 'ABC';
                        elem.onclick = () => { this.rewriteKeyboard(false); }
                        elem.classList.add('button-wide');
                        break;

                    case 'caps':
                        elem.innerHTML = buttonValue;
                        elem.onclick = () => { this.caps = !this.caps; this.rewriteKeyboard(false); }
                        elem.classList.add('button-wide');
                        break;

                    case 'lang':
                        elem.innerHTML = '<span class="material-icons">language</span>';
                        elem.onclick = () => { this.rewriteKeyboard(); }
                        elem.classList.add('button-wide');
                        break;

                    case 'left':
                        elem.innerHTML = '<span class="material-icons">keyboard_arrow_left</span>';
                        elem.onclick = () => {this.movecursor(-1)}
                        break;

                    case 'right':
                        elem.innerHTML = '<span class="material-icons">keyboard_arrow_right</span>';
                        elem.onclick = () => {this.movecursor(1)}
                        break;

                    default:
                        elem.innerHTML = this.caps ? buttonValue.toUpperCase() : buttonValue.toLowerCase();
                        elem.onclick = this.defaultButton.bind(this); // крутотень
                        break;
                }
                elem.classList.add('styled');
                result.push(elem);
            })


        return result
    } 
    
    
    // FUNCTIONS  -------------------------------------


    appendToParent(lang) {

        let items = this.createButtons(lang);
        items.forEach((item) => {
            let lo = this.parentElem.appendChild(item);
             if (item.classList.contains('button-wide')) { item.insertAdjacentHTML("afterEnd", "<div class='breaker'></div>");}
             })
    }

    rewriteKeyboard(numeric) {
        this.parentElem.innerHTML = '';
        if (numeric) { this.appendToParent('numeric'); return; }
        else if (numeric == false) { this.appendToParent(this.lang ? 'RU' : 'EN'); }
        else {
            this.lang = !this.lang;
            this.appendToParent(this.lang ? 'RU' : 'EN');
        }
    }

    movecursor(n){
        let input = document.querySelector('#input');
        input.setSelectionRange(input.selectionStart+n, input.selectionEnd+n)
        input.focus();
       
       
  
    }

 



// BUTTONS ----------------------------------------

    defaultButton() {
        let input = document.querySelector('#input');
        input.setRangeText(event.target.innerHTML, input.selectionStart, input.selectionEnd, "end");
        input.focus();
    }

    enter() {
        let input = document.querySelector('#input');
        input.setRangeText('\n', input.selectionStart, input.selectionEnd, "end");
        input.focus();
    }


    space(){
        let input = document.querySelector('#input');
        input.setRangeText(' ', input.selectionStart, input.selectionEnd, "end");
        input.focus();
    }

    backspace(){
        let input = document.querySelector('#input');
        input.setRangeText('', input.selectionStart - 1, input.selectionEnd, "end");
        input.focus();
    }

}
