class Ajax_meteo{

    async get(url) {

        const username='bmstu_buidina_kristina'
        const password='6KZ52XxDpt'
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        return fetch(url, {
            method: 'GET', headers: headers
        }).then(function (resp) {
            return resp.json();
        }).catch(function (err) {
            console.log('something went wrong', err);
        });
    }
}

export const ajax_meteo = new Ajax_meteo();