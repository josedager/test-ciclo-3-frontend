const URL_API = "http://localhost:8080";

function getToken() {
    return JSON.parse(localStorage.getItem("usuario")).token;
}

export function serviceListarEquipos() {
    var myHeaders = new Headers({ "Content-Type": "application/json" , 'Authorization': getToken() });

    const path = "/api/equipos/equipos";

    var miInit = {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default"
    };

    return fetch(URL_API + path, miInit).then(response => {
        if (response.status !== 200) {
            return Promise.reject(response.status);
        }
        else {
            return response.json();
        }
    });
}