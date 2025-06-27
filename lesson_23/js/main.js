// Задача №1
// Отримати в константу елемент < body >:

const bodyElement = document.querySelector('body') // або -> document.body
if (bodyElement) {
    console.log(bodyElement)
}

// Задача №2
// Написати функцію, яка додає в < body > список UL
// з певною кількістю LI(кількість має передаватись як параметр функції, також мати значення за замовченням):

function addBlock(block, body) {
    if (body) {
        body.insertAdjacentElement('afterbegin', block)
    }
}
function createBlock(count = 1, element) {

    // Це було моє виконання до того як зайшов до колеги "Alex Cherniakov", після побаченного вирішив удосконалити своє творіння
    // let blockElement = '<ul class="list">'
    // for (let i = 0; i < count; i++) {
    //     blockElement += `<li class="list__item" > Елемент #${i + 1}</li>`
    // }
    // blockElement += '</ul>'

    const ulElement = document.createElement('ul')
    ulElement.classList.add('list')
    for (let i = 0; i < count; i++) {
        const liElement = document.createElement('li')
        liElement.classList.add('list__ilem')
        liElement.append(`Елемент #${i + 1}`)
        ulElement.append(liElement)
    }
    return addBlock(ulElement, element)
}
createBlock(7, bodyElement)

// Задача №3
// Додати до елементу < body > класс loaded.
// якщо є клас loaded, додати стиль кольору тесту зелений:

if (bodyElement) {
    bodyElement.classList.add('loaded') // або -> bodyElement.className += ` loaded` -> bodyElement.classList.toggle('loaded')
}
if (bodyElement.classList.contains('loaded')) {
    bodyElement.style.color = 'green'
}

// Задача №4
// В html: є три елементи з класом item, кожному додати клас active,
// перезаписати контент кожного елемента на "Елемент №(порядковий номер починаючи з 1)":

const itemElements = document.querySelectorAll('[class*="item"]')
if (itemElements.length) {
    itemElements.forEach((itemElement, index) => {
        itemElement.classList.add('active')
        itemElement.innerHTML = `Елемент №${index + 1} `
    })
}

// Задача №5
// В html: текст, далі кнопка з класом button.
// Треба прокрутити скрол сторінки до кнопки:

const buttonElement = document.querySelector('.button')
function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({
            block: 'center',
            behovior: 'smooth'
        })
    }
}
scrollToElement(buttonElement)

// Задача №6
// В html: посилання з класом link та дата атрибут зі значенням 100,
// Отримати значення атрибуту, якщо значення меньше 200,
// фарбувємо текст посилання в червоний:

const linkElement = document.querySelector('.link')
if (linkElement && parseFloat(linkElement.dataset.link) < 200) {
    linkElement.style.color = 'red'
}