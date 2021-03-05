document.body.onload = function() {

   let elems = createButton(DIGITS,BUTTON);
    allChildsAppend(document.querySelector('#calc'),elems);

}

document.querySelector('#calc').addEventListener('mouseup',kkk);
function kkk(){
    let element = event.target;
    let inputField = document.querySelector('#inputfield');
    if (element.innerHTML === '=') { inputField.value = Math.trunc(math.evaluate(inputField.value)); return;}
    if (element.innerHTML === 'C') { inputField.value = ''; return;}
    if (DIGITS.indexOf(element.innerHTML)) {inputField.value += element.innerHTML;};
    

}