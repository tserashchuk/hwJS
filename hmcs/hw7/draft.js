xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', false);
xhr.send();
console.log(xhr.responseText);