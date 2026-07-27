async function regCb(body, ml, lg, pwd, msg, logger){
    try {
    let {signUp} = await import ('./modules/api.js');
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