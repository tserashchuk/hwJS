let yearGlob = 2021;
let monthGlob = 1;
let now = new Date();
now.setHours(0, 0, 0, 0);

function printCalendar(year, month) {
    document.querySelector('#calendar')?.remove();
    document.querySelector('.current')?.remove();
    
    let calend = new Date(year, month);
    
    let data = "<table id='calendar'><tbody><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr></tbody></table>"
    document.body.insertAdjacentHTML('beforeEnd', data);
    document.body.insertAdjacentHTML('afterBegin', `<span class='current' onclick='back();'><span>${year}</span>/<span>${month+1}</span></span>`);
    for (let i = 0; i < 7; i++) {
        document.querySelector('#calendar').tBodies[0].insertAdjacentHTML('beforeEnd', `<tr class = 'my'></tr>`);
        for (let j = 1; j < calend.getDay(); j++) { document.querySelectorAll('.my')[i].insertAdjacentHTML('beforeEnd', `<td class = 'mytd'> </td>`); }
        for (let j = calend.getDay(); j < 8; j++) {
            let a = document.querySelectorAll('.my')[i];

            // console.log(calend.valueOf(),now)
            if (calend.valueOf() === now.valueOf()) {
                a.insertAdjacentHTML('beforeEnd', `<td class = 'mytd now'>${calend.getDate()}</td>`);
                calend = new Date(calend.setDate(calend.getDate() + 1));
                if (calend.getDate() == 1) { break; }
                continue;
            } else {

                a.insertAdjacentHTML('beforeEnd', `<td class = 'mytd'>${calend.getDate()}</td>`);
                calend = new Date(calend.setDate(calend.getDate() + 1));
                if (calend.getDate() == 1) { break; }
            }
        }
        if (calend.getDate() == 1) { break; }
    }
}

printCalendar(yearGlob, monthGlob);



function nextmonth() {
    monthGlob++;
    printCalendar(yearGlob, monthGlob);

}

function prevmonth() {
    monthGlob--;
    printCalendar(yearGlob, monthGlob);

}

function back() {
    yearGlob = 2021;
    monthGlob = 1;
    printCalendar(2021, 1);

}