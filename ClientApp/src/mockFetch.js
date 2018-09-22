const gauth = {googleId: '117830126358750470964', profileObj: {name: 'Назар Воронич', email: 'voronych.nazik@gmail.com'}};
const gauthjson = "{\"GoogleId\":\"117830126358750470964\",\"Name\":\"Назар Воронич\",\"Mail\":\"voronych.nazik@gmail.com\"}";
const fileList = "[{\"IdNameHash\":\"1cad43cd9603f8c89193297138c6557c\",\"NameFile\":\"Hello World\",\"Owner\":\"117830126358750470945\",\"ValueHash\":\"b1501c02ae4ecfa9b395afb183281493\"},{\"IdNameHash\":\"f1cad43cd9603f8c89193297138c6557c\",\"NameFile\":\"fHello World\",\"Owner\":\"117830126358750470945\",\"ValueHash\":\"b1501c02ae4ecfa9b395afb183281493\"}]";
const file = "# Hello World!\r\n**TODO:** Make better first file"

const mockFetch = (url, params) => {
    let r;
    if (url === '/GoogleAuth') {
        r = gauth;
    } else if (url === '/api/GoogleAuth') {
        r = (params.body === gauthjson && params.headers['Content-Type'] === 'application/json; charset=utf-8') ? {json: () => JSON.parse(fileList)} : 'Something is wrong with ' + url;
    } else if (url === `/api/${gauth.googleId}/1cad43cd9603f8c89193297138c6557c` ||url === `/api/${gauth.googleId}/f1cad43cd9603f8c89193297138c6557c`) {
        r = (params.method === 'GET') ? {text: () => file} : 'File saved. Text is: ' + params.body;
    }
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(r);
        }, 500)
    })
};

export default mockFetch