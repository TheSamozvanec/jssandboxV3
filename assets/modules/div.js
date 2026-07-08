export function div(monitor, style) {
  
monitor.innerHTML=`
<div class='dv'>demo</div>
`
style.innerHTML=`
#monitor .dv {
width: 200px;
background:#00ff00;
border: 1px solid black;
transition:all 0.8s ease;
}
#monitor .dv:hover{
transform:translate(50px, 50px) scale(1.4);
background:#ff0000
}
`
let dv=monitor.querySelector('.dv')
dv.addEventListener('click', input)
}
export function input(ev) {
  let ip=document.createElement('input')
  ip.value=this.textContent
  this.textContent=''
  this.append(ip)
  ip.focus()
  this.removeEventListener('click', input)
  ip.addEventListener('blur', insert)
}
export function insert(ev) {
  let ip=this.parentElement;
  ip.textContent=this.value;
  ip.addEventListener('click', input)
  this.removeEventListener('blur', insert)
  this.remove()
}
export const help = `
div - функция создает html элемент div, при наведении стрелки происходит смещение элемента, движение вниз и вправо и смена цвет. Клик по элементу открывает поле ввода input. После ввода текста и потери фокуса input исчезает, а введенный текст переходит в содержимое div.
 
Импорт функции 
<b>let {div} = await import('./modules/div.js')</b>
После импорта вы можете посмотреть текст функция, для этого используйте внутренюю функцию printC(). Внутреняя функция print() не экранирует верстку и текст функции будет некорректным.
<b>printC(div)</b> - полный текст функции.
Чтобы запустить функцию, в её параметры необходимо передать 2 глобальных объекта: 
<b>monitor</b> и <b>style</b>
<b>div(monitor, style)</b>
Этого достаточно для запуска функции, но функция также обращается к функциям input() и insert(), которые содержатся в модуле и могут быть импортированы для изучения кода.

Начинающим программистам я рекомендую изучить этот момент! Дело в том, что формально импорт передает только импортированную функцию, но у функции своя облость видимости, свой <b>name space</b>. Именно по этому объекты <b>monitor</b> и <b>style</b>, которые доступны в окне code, не фидны в импортированной функции и их нужно явно передать, чтобы все работало, но функция работает без явных импортов input() и insert(), так как они в её поле видимости.

Все модули, которые я буду размещать будут иметь экспорт для любых функций, используемых внутри модуля. Тоесть Вы всегда сможете импортировать и взяглянуть своими глазами, что за функция будет запущена. Это ваше спокойствие и безопасность, так вы будете уверены что не запускаете вредоносный код. Любой код, в котором вы засомневаетесь можно загуглить пропустить через AI или исследовать другим способом прежде чем запустить. Прятный бонус таких действий - если вы чего-то раньше не знали - теперь знаете &#128513;
`