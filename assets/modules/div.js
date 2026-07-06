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
div - функция создает html элемент div, 
при наведении стрелки происходит 
смещение элемента, движение вниз и 
вправо и смена цвет. Клик по элементу 
открывает поле ввода input. После ввода 
текста и потери фокуса input исчезает,
а введенный текст переходит в содержимое div.
 
Импорт функции 
<b>let {div} = await import('./modules/div.js')</b>
После импорта вы можете посмотреть 
текст функция, для этого используйте 
внутренюю функцию printC(). 
Внутреняя функция print() не экранирует 
верстку и текст функции будет 
некорректным.
<b>printC(div)</b> - полный текст функции.
Чтобы запустить функцию, 
в её параметры необходимо передать
2 глобальных объекта:<b>monitor</b> и <b>style</b>
<b>div(monitor, style)</b>
Этого достаточно для запуска функции, 
но функция также обращается 
к функциям input() и insert(), 
которые содержатся в модуле и могут 
быть импортированы для изучения кода.
`