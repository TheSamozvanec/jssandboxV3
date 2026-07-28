export async function regCb(body, ml, lg, pwd, msg, logger){
    try {
    let {signUp} = await import ('./api.js');
    let res = await fetch(signUp, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',},
    credentials: 'include',
    body
    })
      if (res.status>=400) {
        let st = res.status
        let {errors} = await res.json()
        let txt=errors.reduce((res, {field, message}) => {
          if(field==='login') lg.use('err');
          if(field==='email') ml.use('err');
          if(field==='password') pwd.use('err')
          return res+message+'/ ';
        }, '')
        msg.use({err:txt+st});
        if (typeof logger==='function') logger({st,errors})
      } else {
        const json = await res.json();
        msg.use({suc:json.login+' успешно зарегистрирован!'});
        if (typeof logger==='function') logger({json});
      }   
    } catch (err) {
      msg.use({ err: 'Ошибка сети или сервера' });
      if (typeof logger === 'function') logger({ error: err.message });
    } 
  }
  export const help =`
  Функция - коллбэк, которая отправляет запрос для регистрации на <a href='https://poligon.semov777.com'>полигоне</a>.
  Данную функцию необходимо передать в качестве коллбэка в <b>regHand</b>. Для логирования идеально подходит <b>printR</b>.
  Как это работает:
  1. <b>await regHand(monitor, style, regCb, printR)</b> - вызываем <b>regHand</b> асинхронно! и передаем <b>regCb</b> в качестве коллбэка. <b>printR</b> будет логировать все ответы сервера, если конечно его передать 4-м параметром.
  2. В мониторе вы увидите форму для регистрации <b>regUI</b> (<b>regHand</b> вызывает её сам).
  3. Если все поля заполнены (даже неправильно), форма проходит простую валидацию <b>regHand</b> (не пустыее) и вызывает <b>regCb</b>, передав в нее все необходимое (смотрите help по regHand)
  4. Далее работает валидация сервера на <a href='https://semov777.com/?section=poligon'>полигоне</a>
  5. <b>regCb</b> получает ответ и проверяет статус <a href="https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml">html ответа</a> 
  6. Если сервер вернул ошибку - коллбэк сам обработает ответ, выделит поля с ошибками и расскажет что не так.

  Для использования нужно импортировать 2 модуля

  const {regHand} = await import ('./modules/regHand.js');
  const {regCb} = await import ('./modules/regCb.js');
  // запускаем
  await regHand(monitor, style, regCb, printR);

  Я думаю не обязательно объяснять что это все нужно выполнять в асинхронной функции <b>async function reg(){ ... }</b>

  <b>Рекомендации</b>
  Внимательно изучите функции перед запуском.
  printC(regHand)
  printC(regCb)

  Преднамеренно допустите все возможные ошибки валидации сервера:
  - вбейте email например без знака "@"
  - вбейте логин со спецсимволами (№;%...)
  - Вбейте пароль из 2 символов.
  - Устраняйте по очереди ошибки валидации и смотрите на логи (как приходит ошибка)

  После регистрации, попробуте зарегистрируйте еще раз того же пользователя и смотрите что показывает логгер
  Так вы сможите понять в каком виде приходят ошибки с полигона.

  Для проверки своего зарегистрированного пользователя, можно зайти на <a href="https://poligon.semov777.com">заглушку полигона</a> и авторизоваться там, но лучше на дисктопе (адаптива я не делал пока). После авторизации нажмите "тест" и откройте консоль чтобы увидеть всех пользователей.

  Удачных экспериментов и ждите новых модулей. 
  `