'use strict';

class Test {
    constructor(option) {
        this.question = '';
        this.answers = [];
        this.checkAnswers = [];
    }

    addQuestion(quest) {
        this.question = quest;
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }

    addCheckAnswer(chk) {
        this.checkAnswers.push(chk);
    }
}

let numQuestion = 0;
let numAnswer = 2;
let answerMas = [];
let timerListener;
/**
 * Добавление варианта ответа на вопрос
 * @param e
 */
btnAddAnswer.onclick = function (e) {
    numAnswer++;
    let bkAnsver = document.querySelectorAll('.bkAnsver');
    let newAnswer = document.createElement('div');
    newAnswer.id = `blockAnsw-${bkAnsver.length + 1}`;
    newAnswer.classList.add('answer');
    newAnswer.classList.add('bkAnsver');
    let lbAnswer = document.createElement('label');
    lbAnswer.classList.add('lbAnswer');
    lbAnswer.htmlFor = `qAnsw-${bkAnsver.length + 1}`;
    lbAnswer.innerText = `Ответ ${bkAnsver.length + 1}:`;
    let inputTxt = document.createElement('input');
    inputTxt.type = 'text';
    inputTxt.id = `qAnsw-${bkAnsver.length + 1}`;
    inputTxt.dataset.id = `id-${bkAnsver.length + 1}`;
    inputTxt.classList.add('textForm');
    inputTxt.classList.add('answer');
    let inputCheck = document.createElement('input');
    inputCheck.type = 'checkbox';
    inputCheck.id = `qChk-${bkAnsver.length + 1}`;
    inputCheck.dataset.chk = `chk-${bkAnsver.length + 1}`;
    inputCheck.classList.add('check');
    blokAnswers.append(newAnswer);
    newAnswer.append(lbAnswer, inputTxt, inputCheck);

}
/**
 * Удаление добавленного ответа
 */
btnMoveAnswer.onclick = function () {
    numAnswer--;
    let bkAnswer = document.querySelectorAll('.bkAnsver');
    if (bkAnswer.length > 2) {
        let moveAnswer = document.getElementById(`blockAnsw-${bkAnswer.length}`);
        moveAnswer.parentNode.removeChild(moveAnswer);
    }
}

/**
 * Добавление вопроса в список
 * @param e
 */
btnAddQuestion.onclick = function (e) {
    let quest = document.getElementById('question');
    if (quest.value.trim() === "") {
        quest.value = '';
        alert('Не задан текст вопроса');
        return;
    }
    //numQuestion++;
    if (!checkNotEmptyText()) {
        alert('Не указано минимальное количество ответов (2-а)');
        return;
    }
    if (!checkNotEmptyAnswer()) {
        alert('Нет указанных правильных вариантов ответа');
        return;
    }

    addNewQuestion(answerMas);
    clearForm();
    allQuestion.innerText = answerMas.length;
    startTest.disabled = false;
    clearQuestion.disabled = false;
}
/**
 * Запуск тестирования
 */
startTest.onclick = function () {
    clearFieldQuestion();
    let tH = document.getElementById('tHour');
    let tM = document.getElementById('tMinute');
    let tS = document.getElementById('tSecond');
    tH.disabled=true;
    tM.disabled=true;
    tS.disabled=true;
    infoChkTime.disabled=true;
    startTest.disabled = true;
    finishTest.disabled = false;
    clearQuestion.disabled = true;
    btnAddAnswer.disabled = true;
    btnMoveAnswer.disabled = true;
    btnAddQuestion.disabled = true;
    answerMas.forEach((item, index) => getTest(item, index + 1));
    trueQuestion.innerText = '0';
    falseQuestion.innerText = '0';
    if(infoChkTime.checked){
        timerListener=timer();
    }
}


finishTest.onclick = function () {
    comleateTest();
}
/**
 * Очистка списка вопросов
 */
clearQuestion.onclick = function () {
    clearFieldQuestion();
    startTest.disabled = true;
    finishTest.disabled = true;
    clearQuestion.disabled = true;
    allQuestion.innerText = '0';
    trueQuestion.innerText = '0';
    falseQuestion.innerText = '0';
    answerMas = [];
}
tHour.oninput = function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
}
tMinute.oninput = function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
}
tSecond.oninput = function (e) {
    e.target.value = e.target.value.replace(/\D/g, '');
}
infoChkTime.onclick = function (e) {
    let timerContent = document.querySelector('.timerContent');
    if (e.target.checked) {
        timerContent.classList.remove('timerContentHide');
    } else {
        timerContent.classList.add('timerContentHide');
    }
}

/**
 * Aeyrwbz nfqnthf
 */
function timer() {
    //Задание начальных значение и блокировка полей
    let tH = document.getElementById('tHour');
    tH.disabled=true;
    let tM = document.getElementById('tMinute');
    tM.disabled=true;
    let tS = document.getElementById('tSecond');
    tS.disabled=true;
    checkTimer(tS, tM, tH);
//Работа таймера
    let testTime = setInterval(function () {
        if (Number(tH.value)!==0&&Number(tM.value)===0&&Number(tS.value)===0){
            tH.value=tH.value-1;
            tM.value=59;
            tS.value=59;
        }
        else if(Number(tM.value)!==0&&Number(tS.value)===0){
            tM.value=tM.value-1;
            tS.value=59;
        }
        else{
            tS.value=tS.value-1;
        }

        if (Number(tH.value) === 0 && Number(tM.value) === 0 && Number(tS.value) === 0) {
            comleateTest();
            clearInterval(testTime);
        }
    }, 1000);
    return testTime;
}

/**
 * Проверка заполнения таймера с установкой начального значеия
 */
function checkTimer(tS, tM, tH, second = 0, minute = 10, hour = 0) {
    setTimeInAria(tH, hour);
    setTimeInAria(tM, minute);
    setTimeInAria(tS, second);
}

/**
 * Установка значеия в поле элемента input
 * @param elem Передаваемый элемент
 * @param timeValue Значение по умолчанию
 */
function setTimeInAria(elem, timeValue = 1) {
    if (!elem.value) {
        elem.value = timeValue;
    }
}

/**
 * Очистка поля с вопросами
 */
function clearFieldQuestion() {
    allQuestion.innerText = answerMas.length;
    let remQuestion = document.querySelectorAll('.testQuestion');
    for (let i = 0; i < remQuestion.length; i++) {
        remQuestion[i].parentNode.removeChild(remQuestion[i]);
    }
}

/**
 * Завершает работу теста
 */
function comleateTest() {
    if(infoChkTime.checked){
        clearInterval(timerListener);
    }
    let tH = document.getElementById('tHour');
    let tM = document.getElementById('tMinute');
    let tS = document.getElementById('tSecond');
    tH.disabled=false;
    tH.value='';
    tM.disabled=false;
    tM.value='';
    tS.disabled=false;
    tS.value='';
    infoChkTime.disabled=false;
    startTest.disabled = false;
    finishTest.disabled = true;
    clearQuestion.disabled = false;
    btnAddAnswer.disabled = false;
    btnMoveAnswer.disabled = false;
    btnAddQuestion.disabled = false;
    let allAnswers = document.querySelectorAll('.testQuestion');
    if (allAnswers.length > 0) {
        allAnswers.forEach((item, index) => {
            if (checkAnswers(answerMas, item, index)) {
                trueQuestion.innerText = Number(trueQuestion.innerText) + 1;

            } else {
                falseQuestion.innerText = Number(falseQuestion.innerText) + 1;
            }
        });
    }
}

/**
 * Проверяет, что даны, как минимум, два варианта ответов
 * @returns {boolean} Результат проверки
 */
function checkNotEmptyText() {
    let ind = 0;
    let bkAnsver = document.getElementById('blokAnswers');
    let allVariants = bkAnsver.querySelectorAll('.textForm');
    for (const item of allVariants) {
        item.value.trim() ? ind++ : ind;
        if (ind === 2) {
            return true;
        }
    }
    return false;
}

/**
 * Проверяет, что выбран, как минимум, один правильный вариант ответа
 * @returns {boolean} Результат проверки
 */
function checkNotEmptyAnswer() {
    let ind = 0;
    let bkAnsver = document.getElementById('blokAnswers');
    let allVariants = bkAnsver.querySelectorAll('.check');
    for (const item of allVariants) {
        item.checked ? ind++ : ind;
        if (ind === 1) {
            return true;
        }
    }
    return false;
}

/**
 * Проверка правильных вариантов ответа
 * @param answerMas массив с данными
 * @param position Текущий вопрос
 * @param findIndex Индекс вопроса
 * @returns {boolean} результат проверки
 */
function checkAnswers(answerMas, position, findIndex) {
    let flag = true;
    let checks = position.querySelectorAll('.check');
    let answer = position.querySelectorAll('.textForm');
    checks.forEach((item, index) => {
        if (item.checked === Boolean(answerMas[findIndex].checkAnswers[index])) {
            answer[index].style.backgroundColor = 'lightgreen';
        } else {
            answer[index].style.backgroundColor = 'lightsalmon';
            flag = false;
        }
    });
    return flag;
}

/**
 * Выводит блок с вопросом на форму
 * @param objQuestion Передаваемый вопрос
 * @param ind Идентификатор позиции
 */
function getTest(objQuestion, ind) {
    let testBox = document.createElement('div');
    testBox.id = 'testQuestion-' + ind;
    testBox.classList.add('testQuestion');
    let title = document.createElement('h2');
    title.id = 'testTitle-' + ind;
    title.innerText = `Вопрос ${ind}: ${objQuestion.question}`;
    testBox.append(title);
    for (let i = 0; i < objQuestion.answers.length; i++) {
        let blockAnswers = document.createElement('div');
        blockAnswers.id = `testAnsw-${i + 1}`;
        blockAnswers.classList.add('answer');
        let lbAnswer = document.createElement('label');
        lbAnswer.classList.add('lbTestAnswer');
        lbAnswer.htmlFor = `qTestAnsw-${i + 1}`;
        lbAnswer.innerText = `Ответ ${i + 1}:`;
        blockAnswers.append(lbAnswer);
        let qTest = document.createElement('input');
        qTest.id = `qTestAnsw-${i + 1}`;
        qTest.dataset.id = `idTest-${i + 1}`;
        qTest.classList.add('textForm', 'answer');
        qTest.type = 'text';
        qTest.value = objQuestion.answers[i];
        blockAnswers.append(qTest);
        let qCheck = document.createElement('input');
        qCheck.dataset.chk = `chkTest-${i + 1}`;
        qCheck.classList.add('check');
        qCheck.type = 'checkbox';
        blockAnswers.append(qCheck);
        testBox.append(blockAnswers);
    }
    content.append(testBox);
}

/**
 * Добавление нового вопроса в массив
 */
function addNewQuestion(answerMas) {
    let objQuest = new Test();
    objQuest.addQuestion(question.value);
    let answers = document.querySelectorAll('.bkAnsver').length;
    for (let i = 1; i <= answers; i++) {
        let ans = document.getElementById(`qAnsw-${i}`);
        objQuest.addAnswer(ans.value);
        let chk = document.getElementById(`qChk-${i}`);
        if (chk.checked) {
            objQuest.addCheckAnswer(1);
        } else {
            objQuest.addCheckAnswer(0);
        }
    }
    answerMas.push(objQuest);
}

/**
 * Очистка данных формы
 */
function clearForm() {
    if (numAnswer > 2) {
        for (let i = 3; i <= numAnswer; i++) {
            let remElem = document.getElementById('blockAnsw-' + i);
            remElem.parentNode.removeChild(remElem);
        }
        numAnswer = 2;
    }
    question.value = '';
    for (let i = 1; i <= 2; i++) {
        document.getElementById('qAnsw-' + i).value = '';
        document.getElementById('qChk-' + i).checked = false;
    }
}


