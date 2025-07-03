// Задача №1
// Отримати в константу елемент < body >:

// === Коиентар ===
// №1 - body це і є сторінка, тому можна body ніколи не перевіряти на наявність, так само як і html тег.

const bodyElement = document.querySelector('body') // або -> document.body

console.log(bodyElement)

// Задача №2
// Написати функцію, яка додає в < body > список UL
// з певною кількістю LI(кількість має передаватись як параметр функції, також мати значення за замовченням):

// === Коиентар ===
// №2 - Якщо створюєте універсальну функцію куди можна передавати елемент в який потрібно вставити ваш список, 
// завжди перевіряйте те що передали, могли передати undefined чи null і отримаєте помилку. 
// Зараз ви до body додаєте тому без питань, але ж другим аргументом можна передати якийсь div з класом some-block який вже не впевнені чи буде чи ні на сторінці. 
// Тому якщо ви не впевнені що елемент 100% буде на сторінці завжди додавайте перевірки.

// №3 - Просто текст варто записувати як текст а не додавати як html елемент liElement.textContent

// №4 - Аа дійшло для чого у вас там перевірка if (body) але тут виникає питання, 
// навіщо робити ті всі маніпуляції зі створенням списку якщо в результаті при додаванні до body елемента можна отримати false в перевірці і нічого не відбудеться? 
// Краще перед тим як робити всі ці маніпуляції перевірити чи є взагалі куди додавати, і якщо немає то не потрібно взагалі нічого робити, це зайві дії будуть.

if (bodyElement) {

    function addBlock(block) {
        bodyElement.insertAdjacentElement('afterbegin', block)
    }

    function createBlock(count = 1) {

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
            liElement.textContent = `Елемент #${i + 1}`
            ulElement.append(liElement)
        }
        return addBlock(ulElement)
    }

    createBlock(7)
}


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

// === Коиентар ===
// №5 - Для практики добре, але далі використовуйте більш унікальні назви, 
// а то в коді багато може бути елементів де буде присітнє item і класи можуть потрапити в ті місця які не мали б його мати. 
// Більш того ще й весь innerHtml перезапишете всюди де не потрібно.

// №6 - innerHTML для html розмітки, для текст є textContent чи innerText.

const itemElements = document.querySelectorAll('.list__item') // або -> document.querySelectorAll('[class*="item"]')
if (itemElements.length) {
    itemElements.forEach((itemElement, index) => {
        itemElement.classList.add('active')
        itemElement.textContent = `Елемент №${index + 1} `
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

// === Коиентар ===
// №7 - Не вірно умову переписали, в задачі було сказано Треба додати до посилання дата атрибут зі значенням 100 ми вчимо js тому додати треба з js а не html.

const linkElement = document.querySelector('.link')
if (linkElement) {
    if (!linkElement.hasAttribute('data-link')) {
        linkElement.dataset.link = 100 // або -> linkElement.setAttribute('data-link', 100)
    }
    if (parseFloat(linkElement.dataset.link) < 200) {
        linkElement.style.color = 'red'
    }
}