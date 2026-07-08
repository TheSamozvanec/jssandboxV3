export function regUI(monitor, style){
  monitor.innerHTML=`
<div class='auth'>
   <input type='text' class='email ip' placeholder='email'>
   <input type='text' class='login ip' placeholder='login' >
   <input type='text' class='password ip' placeholder = 'password'>

   <button class='smt'>отправить</button>
</div>
<p class='msg'>Авторизация</p>
`
style.innerHTML=`

#monitor .auth {
display: flex;
flex-direction: column;
padding: 3vh;
width: 70vw;
max-width:300px;
height:20vh;
max-height:400px;
background:#aeff00;
box-shadow:3px 3px 2px 1px #a0a0a0
}

*#monitor .smt{
width: 50%;
margin: 16px auto;
}
#monitor .ip{
width: 70%;
}
#monitor .ip.err{
background:red;
}
#monitor .msg{
margin-left:3vw;
}
#monitor .msg.err{
color:red;
}
#monitor .msg.suc{
color:blue;
}
`
  const emlIn=monitor.querySelector('.email')
  const lgIn=monitor.querySelector('.login');
  const pwdIn=monitor.querySelector('.password');
  const smt=monitor.querySelector('.smt');
  const msg=monitor.querySelector('.msg');
  emlIn.use=useIp;
  lgIn.use=useIp;
  pwdIn.use=useIp;
  msg.use=useTxt;
  emlIn.addEventListener('input',skipErr);
  lgIn.addEventListener('input',skipErr);
  pwdIn.addEventListener('input',skipErr);
  return {emlIn, lgIn, pwdIn,smt,msg}
  function useTxt(arg) {
    if(arg.cls===true){
      this.classList.remove('err','suc');
      this.textContent='Регистрация прльзователя'
    }
    if(arg.err){
      this.classList.add('err');
      this.textContent=arg.err
    }
    if(arg.suc){
      this.classList.add('suc');
      this.textContent=arg.suc
    }
  }
  function useIp(arg){
    switch (arg){
     case 'err':
        this.classList.add('err')
     break;
     case 'cls':
        this.classList.remove('err');
        this.value=''
     break; 
     default:
        throw new Error('неверный аргумент')
   }
  }
  function skipErr(ev){
    this.classList.remove('err')
  }
}
export const help = `
Функция создаёт UI компонент - фому регистриации, которая подходит для регистрации на полигоне. Функция возвращает объект, содержаащий 5 DOM элементов:
<b>emlIn</b> - &lt;input&gt; поле ввода email
<b>lgIn</b> - &lt;input&gt; поле ввода логина
<b>pwdIn</b> - &lt;input&gt; поле ввода password
<b>smt</b> - &lt;button&gt; кнопка "отправить"
<b>msg</b> - &lt;p&gt; сообщение под формой.

Кроме стандартных свойствв DOM объекты содержат дополнительный метод <b>use()</b> (кроме <b>smt</b>.). 
Для полей ввода в <b>use</b> можно передать аргумент <b>'err'</b> чтобы указаать ошибку валидации и <b>'cls'</b> для очистки поля и восстановления цвета.Пример emlIn.use('err') - поле ввода станет красным.
Для сообщения в <b>use</b> передается объет <b>msg.use({err:'Ошибка! Такой пользователь зарегистрирован!'})</b>. Объект может содержать следующие ключи:
- <b>{err:'текст ошибки'}</b> ключь err окрасит текст сообщения в красный, значение - текст ошибки.
- <b>{suc:'успешная реистрация'}</b> ключ suc окрасит текст сообщения в синий, значение - текст сообщения.
- <b>{cls:true}</b> В ключе cls передается логическое true. Цвет сообщения становится нейтральным, текст "Авторизация"
Кнопка smb является стандаартным DOM, на который может быть установлен слушатель событий.
Импорт функции 
<b>let {regUI} = await import('./modules/regUI.js')</b>
После импорта вы можете посмотреть 
текст функция, для этого используйте 
внутренюю функцию printC(). 
Внутреняя функция print() не экранирует 
верстку и текст функции будет 
некорректным.
<b>printC(regUI)</b> - полный текст функции.

Синтаксис использования функции: 
<b>let ui=regUI(monitor,style)</b> 
для получения всех элементов в одном объекте. Более удобный способ - деструктуризация. 
<b>let {emlIn, lgIn, pwdIn, smt, msg}=regUI(monitor,style)</b>. 
Послее выполнения данного кода в мониторе (нижняя часть экрана) появится форма для ввода пароля, логина и адреса электронной почты. Вы можете установить слушатель событий на кнопку 
<b>smt.addEvntListeneer('click',()=>{...})</b> 
и задаать функцию пр инажаатии кнопки "отправить". Внутри функции можно использовать <b>use</b> для форматирования отдельных элементов формы в зависимости от ситуации. 
`