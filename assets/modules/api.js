export const api = {
    baseURL:'https://poligon.semov777.com/api',
    auth:{
        sin:'/auth/sign-in',
        sout:'/auth/sign-out',
        chek:'/auth/chek',
        out:'/auth/logaut'
    },
    user:'/user',
    thing:'/thing',
}
export const signIn = 'https://poligon.semov777.com/api/auth/sign-in';
export const signOut = 'https://poligon.semov777.com/api/auth/sign-out';
export const usrChek = 'https://poligon.semov777.com/api/auth/chek';
export const user = 'https://poligon.semov777.com/api/user';
export const thing = 'https://poligon.semov777.com/api/thing';
export const help = `
Объект api содержит раздробленный набор ручек, 
которые нужно соединить в теле запроса с baseURL
<code>fetch(baseURL+auth.sin, {...})</code>
Импортируйте весь объект 
<code>let { api } = await import('./modules/api.js')</code>
и изучите его структуру 
<code>printR(api)</code>
Можно импортировать полные адреса(без сложений):
signIn = 'https://poligon.semov777.com/api/auth/sign-in';
signOut = 'https://poligon.semov777.com/api/auth/sign-out';
usrChek = 'https://poligon.semov777.com/api/auth/chek';
user = 'https://poligon.semov777.com//api/user';
thing = 'https://poligon.semov777.com/api/thing';
Изучите документацию для работы с полигоном
<a href="https://semov777.com/?section=poligon">poligon</a>
`
