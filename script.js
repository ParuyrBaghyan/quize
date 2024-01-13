let list = [
    {
        quest: 'Ո՞ր օրն է համարվում շաբաթվա առաջին օրը Իսրայելում',
        trueoption: 'Կիրակի',
        option1: 'Ուրբաթ',
        option2: 'Երկուշաբթի',
        option3: 'Շաբաթ',
        photo: 'img/1.jpg',
    },
    {
        quest: 'Ո՞ր քիմիական տարրի հայտնագործման պատվին են Ֆրանսիայում 19-րդ դարում հատել Ապոլոնի պատկերով մեդալ',
        trueoption: 'Հելիում',
        option1: 'Ռադիում',
        option2: 'Ջրածին',
        option3: 'Տիտան',
        photo: 'img/2.jpg',
    },
    {
        quest: 'Ըստ իր խոստովանության ինչի՞ աստվածն էր Օլե Լուկոյեն՝ Անդերսենի համանուն հեքիաթից',
        trueoption: 'Երազների',
        option1: 'Գիշերվա',
        option2: 'Հեքիաթների',
        option3: 'Մանկության',
        photo: 'img/3.jpg',
    },
    {
        quest: 'Ավանդաբար ի՞նչ են անում երաժիշտները Հայդնի «Հրաժեշտի սիմֆոնիան» նվագելիս',
        trueoption: 'Հանգցնում են մոմերը',
        option1: 'Համբույրներ են ուղարկում',
        option2: 'Երգում են',
        option3: 'Գլխարկ են հագնում',
        photo: 'img/4.jpg',
    },
    {
        quest: 'Ի՞նչպես է կոչվում մարդկային մարմնի մոդելը՝ բժիշկների ուսուցման իրազննականության համար',
        trueoption: 'Ֆանտոմ',
        option1: 'Խրտվիլակ',
        option2: 'Ուրվական',
        option3: 'Ոգի',
        photo: 'img/5.jpg',
    },
    {
        quest: 'Սիրիայի մայրաքաղաքն է․',
        trueoption: 'Դամասկոս',
        option1: 'Հոմս',
        option2: 'Համա',
        option3: 'Դարխան',
        photo: 'img/6.jpg',
    },
    {
        quest: 'Ո՞ր թիվն է ներկայացված հռոմեական LXXX թվերով',
        trueoption: '80',
        option1: '130',
        option2: '70',
        option3: '530',
        photo: 'img/7.jpg',
    },
    {
        quest: 'Ի՞նչ սանդղակ է օգտագործվում երկրաշարժերի հզորությունը չափելու համար․',
        trueoption: 'Ռիխտեր',
        option1: 'Ֆարենհեյթ',
        option2: 'Քելվին',
        option3: 'Բոֆորտ',
        photo: 'img/8.jpg',
    },
];

let index = 0;
let count = document.querySelector('.count');
let point = 1;
count.innerText = `${point}/${list.length}`;
let question = document.querySelector('.question');
let answer = document.querySelectorAll('.answer');
let next = document.querySelector('.next');
let truepoint = 0;
let precent = 0;
let increment = 0;
let checked = false;
window.onload = () => {
    if (localStorage.getItem('saveIndex') == list.length - 1) {
        localStorage.setItem('saveTruePoint', truepoint = 0);
        localStorage.setItem('saveIndex', index = 0);
        localStorage.setItem('savePoint', point = 1);
        count.innerText = `${point}/${list.length}`;
    }
    else {
        if (localStorage.getItem('savePoint') !== null) {
            point = localStorage.getItem('savePoint');
            count.innerText = `${point}/${list.length}`;
        }
        if (localStorage.getItem('saveIndex') !== null) {
            index = localStorage.getItem('saveIndex');
            loadQuiz(list[index]);
        }
        if (localStorage.getItem('saveTruePoint') !== null) {
            truepoint = localStorage.getItem('saveTruePoint')
        }
    }
}

function loadQuiz(arrayName) {
    question.innerText = arrayName.quest;
    picture.style.background = `url(${arrayName.photo})`;
    let a, b, c, d;
    while (a == b || a == c || a == d || b == c || b == d || c == d) {
        a = Math.round(Math.random() * 3);
        b = Math.round(Math.random() * 3);
        c = Math.round(Math.random() * 3);
        d = Math.round(Math.random() * 3);
    }
    answer[a].innerText = arrayName.trueoption;
    answer[b].innerText = arrayName.option1;
    answer[c].innerText = arrayName.option2;
    answer[d].innerText = arrayName.option3;
}


loadQuiz(list[index]);
function nextQuiz() {
    index++;
    loadQuiz(list[index]);
    localStorage.setItem('saveIndex', index);
    point++;
    localStorage.setItem('savePoint', point);
    count.innerText = `${point}/${list.length}`;
    checked = false;
    answer.forEach(ans => ans.classList.remove('active'));
}

answer.forEach(item => {
    item.onclick = () => {
        answer.forEach(ans => ans.classList.remove('active'));
        item.classList.add('active');
        checked = true;
        next.onclick = () => {
            if (point == list.length - 1) {
                next.innerText = 'Ստուգել արդյունքները';
            }
            if (point >= list.length) {
                if (checked && precent !== 0) {
                    next.disabled = true;
                    let stop = setInterval(() => {
                        increment++;
                        precentpoint.innerText = increment + '%';
                        if (increment == precent) {
                            clearInterval(stop);
                        }
                    }, 30);
                }
            }
            if (checked) {
                if (item.innerText == list[index].trueoption) {
                    if (point < list.length) {
                        nextQuiz();
                        truepoint++;
                        precent = Math.floor(100 / list.length * truepoint);
                        localStorage.setItem('saveTruePoint', truepoint);
                    }
                    else {
                        truepoint++;
                        precent = Math.floor(100 / list.length * truepoint);
                        localStorage.setItem('saveTruePoint', truepoint);
                        return false;
                    }
                    
                }
                else {
                    if (point < list.length) {
                        nextQuiz();
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }
})