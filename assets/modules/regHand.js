export async function regHand(monitor, style, cb, logger=null) {
  try {
    const { regUI } = await import('./regUI.js');
    const {
      emlIn,
      lgIn,
      pwdIn,
      smt,
      msg
    } = regUI(monitor, style);
    smt.addEventListener('click', async (ev) => {
      if (emlIn.value==='') return invalid(emlIn,'email не должен быть пустым!');
      if (lgIn.value==='') return invalid(lgIn,'Login не должен быть пустым!');
      if (pwdIn.value==='') return invalid (pwdIn, 'pssword не должен быть пустым!');
      const body=JSON.stringify({
        email:emlIn.value,
        login:lgIn.value,
        password:pwdIn.value
      });
      await cb(body, emlIn, lgIn, pwdIn, msg, logger)     
    });
      
    function invalid(pl,txt){
      pl.use('err');
      msg.use({err:txt})
    }
  } catch(err) {
    msg.use({err})
  }
}
export const help = `
Функция демонстрирует работу модуля <b>regUI</b>, для этого она сама импортирует функцию <b>regUI</b> и передает в неё аргументы <b>monitor</b> и <b>style</b> для отрисовки UI компонентов.
Функция получает необходимые DOM элементы и устанавливает слушатель событий на кнопку "отправить".
При нажатии на кнопку срабатывает функция, которая производит простейшую валидацию полей формы (они не должны быть пустыми) и при успешном завершении валидации вызывает коллбэк, в который передаются 
  - <b>body</b> - JSON, собранный из значений формы
  - <b>emlIn</b>, <b>lgIn</b>, <b>pwdIn</b> - Все поля ввода: <b>email</b>, <b>login</b> и <b>password</b> (порядок передачи соответствует тексту)
  - <b>msg</b> - Поле вывода msg (изначально содержит текст "Регистрация пользователя")
  - <b>logger</b> - логгер опционально (если Ваш коллбэк не предусматривает логирование - можно не передавать в regHand, тогда будет null)

Импорт функции 
<b>let {regHand} = await import('./modules/regHand.js')</b>
После импорта вы можете посмотреть 
текст функция, для этого используйте 
внутреннюю функцию printC(). 
Внутренняя функция print() тоже подходит, но все же предпочтительней printC()
<b>printC(regHand)</b> - полный текст функции.

Синтаксис использования функции: 
<b>await regHand(monitor, style, cb, logger)</b> - используйте асинхронный стиль!
Здесь cb - Это ваша функция-коллбэк, которая будет вызвана после валидации значений (простейшая встроенная валидация). Предполагается что в коллбэк будут переданы данные и элементы в порядке, который указан выше по тексту, для дальнейшей передачи <b>body</b> в запрос на сервер (формат JSON уже готов к передачи без дополнительных преобразований). DOM элементы передаются для обработки ответа сервера, особенно в случае возникновения ошибок. 
logger также будет передан в коллбэк, но если коллбэк не предусматривает логирование - его можно не передавать, в этом случае Ваш коллбэк примет null. 

Для тестирования функции Вы можете передать в качестве коллбэка print (<b>без скобок!</b>), последний аргумент (logger) при этом передавать не нужно.

Протестируйте функцию, попробуйте не заполнять какие-то поля или не заполнить все поля, потом попробуйте "отправить" заполненную форму и посмотреть какой JSON вернет функция.

В качестве примера более интересного коллбэка попробуйте такой вариант (скопируте код и запустите)

  ;(async function() {
      try {
          const { regHand } = await import('./modules/regHand.js');
          await regHand (monitor,style, cb, printR)
          async function cb(body, emlIn, lgIn, pwdIn, msg, logger) {
           printC (body);
           print ('email:'+emlIn.value, 'login:'+lgIn.value, 'password:'+pwdIn.value);
           let promise = new Promise (res=>{
             setTimeout (()=>{
               const obj=JSON.parse(body)
               msg.use({suc:'Ок!'})
               res(obj)
             })
           }, 1000)
           const res = await promise
           if (typeof logger==='function') logger (res);
          }
      } catch(err) {
          print(err);
      }
  })()
`