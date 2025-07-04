// Задача №1
// Дано в html: три елементи з класом item.
// При кліку на кожен з елментів додати клас active,
// при повторному кліку прибрати клас

// === Коментар ===
// №1 - Це буде працювати але важливо тут розуміти наслідки вашого підходу.
// click на document може бути, це зручно якщо потрібно відслідковувати клік в будь якій частині,
// але mousemove на весь документ потрібно додавати лише тоді коли це реально потрібно, 
// наприклад вам потрібно реалізувати свій особистий вами стилізований курсор миші на сторінці. 
// І ні в якому разі!!! не потрібно комбінувати mousemove разом з click!! 
// Тому що mousemove спрацьовує на кожен піксель зміни позиції курсора, 
// і при кожній зміні буде відбуватися виклик функції, і перевірка if (typeElement === 'click'). 
// Краще розділити на 2 окремі функції і викликати одну для click а іншу для mousemove.

const listElement = document.querySelector('.list')

if (listElement) {
    listElement.addEventListener("click", function addHtmlClass(e) {

        if (e.target.closest(".list__item")) {
            e.target.classList.toggle('active')
            if (e.target.classList.contains('active')) {
                e.target.style.color = "red"
            } else {
                e.target.style.color = ""
                // e.target.removeAttribute('style') Не треба так агресивно це робити, e.target.style.color = "" 
                // краще так.Суть в тому що у цього елемента могли би бути інші інлайн стилі, і не варто видаляти весь атрибут. 
                // Краще передати пустий рядок що прибере тільки червоний колір. 
            }
        }
    })
}

// Задача №2
// Дано в css/scss: body прозорий
// При повному завантаженню сторінки додати клас до body який прибирає прозорість.

// === Коментар ===
// №2 - Зайва перевірка. Ви цю функцію викликаєте як callback для addEventListener, 
// якщо функція викликана, то і так зрозуміло чим саме.

window.addEventListener("DOMContentLoaded", function domLoaded(e) {
    document.documentElement.classList.add('loaded')
})

// Задача №3
// Дано в html: header main footer
// При наведенні курсору на header змінювати колір фону у footer.
// Коли курсор йде з header повертати початковий фон для footer.

// === Коментар ===
// №3 - Як я вже писав в 1 пункті mousemove спрацьовує на кожен піксель зміни позиції курсора, 
// але нам не потрібно в цій задачі відслідковувати прямо кожен піксель, 
// нам потрібно побачити лише коли курсор потрапив на header и коли пішов з header. 
// Тобто mouseenter та mouseleave, ці 2 події спрацюють лише один раз коли курсор потрапить та піде з header, 
// це значно зменшить навантаження на обчислення позиції курсора.

const headerElement = document.querySelector('.header')
const footerElement = document.querySelector('footer')

if (headerElement && footerElement) {
    headerElement.addEventListener("mouseenter", headerMouseActions)
    headerElement.addEventListener("mouseleave", headerMouseActions)
}

function headerMouseActions(e) {
    if (e.type === 'mouseenter') {
        footerElement.style.backgroundColor = 'lightBlue'
    } else {
        footerElement.style.backgroundColor = ''
    }
}

// Задача №4
// Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
// Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру яка збільшується на одиницю: 1 2 3 ... і т.д.
// Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
// Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.

// === Коментар ===
// №4 - Перед тим як додавати стеження за елементом, перевірте спочатку чи є він взагалі в константі block, 
// якщо його не буде на сторінці в константі буде Null а спроба додати стеження за Null викличе помилку.

// №5 - Отримуємо dataset з поточного entry.target а не зовнішніх змінних, 
// намагайтесь уникати звернень до змінних які знаходяться за межами функцій. 
// Інакше ваші функції перестають бути незалежними та універсальними

// №6 - Ви починаєте відлік з одиниці, але якщо в дата атрибут додати число 0, у вас вийде безкінечний лічильний, 
// тому що кожне наступне число не буде ніколи === 0. Перевіряємо >= і починаємо відлік з нуля.
// Також краще як почали відлік прибрати стеження за елементом observer.unobserve 


const block = document.querySelector('.item')
const options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.3,
}

const callback = (entries, observer) => {
    entries.forEach(entry => {
        const currentElement = entry.target
        const dataElem = parseFloat(currentElement.dataset.count)

        if (entry.isIntersecting) {
            observer.unobserve(currentElement)
            currentElement.classList.add('active')
            let i = 0
            let counter = setInterval(() => {
                block.textContent = `${i}`
                i >= dataElem ? clearInterval(counter) : ++i
            }, 1000)
        }
    })
}

const observer = new IntersectionObserver(callback, options)

if (block) {
    observer.observe(block)
}