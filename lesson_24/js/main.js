// Задача №1
// Дано в html: три елементи з класом item.
// При кліку на кожен з елментів додати клас active,
// при повторному кліку прибрати клас

document.addEventListener("click", documentAction)

// Задача №2
// Дано в css/scss: body прозорий
// При повному завантаженню сторінки додати клас до body який прибирає прозорість.

window.addEventListener("load", domLoaded)

function domLoaded(e) {
    if (e.type === 'load') {
        document.documentElement.classList.add('loaded')
    }
}

// Задача №3
// Дано в html: header main footer
// При наведенні курсору на header змінювати колір фону у footer.
// Коли курсор йде з header повертати початковий фон для footer.

document.addEventListener("mousemove", documentAction)

// Задача №4
// Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
// Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру яка збільшується на одиницю: 1 2 3 ... і т.д.
// Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
// Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.

const block = document.querySelector('.item')
const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.3,
}

const callback = (entries, observer) => {
    const dataElem = parseFloat(block.dataset.count)

    entries.forEach(entry => {
        const currentElement = entry.target

        if (entry.isIntersecting && !currentElement.classList.contains('active')) {
            currentElement.classList.add('active')
            let i = 1
            let counter = setInterval(() => {
                block.textContent = `${i}`
                i === dataElem ? clearInterval(counter) : ++i
            }, 1000)
        }
    })
}

const observer = new IntersectionObserver(callback, options)
observer.observe(block)

function documentAction(e) {
    const typeElement = e.type
    const targetElement = e.target
    const footerElement = document.querySelector('footer')

    // Task #1
    if (typeElement === 'click' && targetElement.closest(".list__item")) {
        targetElement.classList.toggle('active')
        if (targetElement.classList.contains('active')) {
            targetElement.style.color = "red"
        } else {
            targetElement.style.color = "black"
        }
    }

    // Task #3
    if (targetElement.tagName === 'HEADER' && typeElement === 'mousemove' && footerElement) {
        footerElement.style.backgroundColor = 'lightBlue'
    } else if (footerElement) {
        footerElement.style.backgroundColor = 'transparent'
    }
}