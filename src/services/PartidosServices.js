const URL_API = "http://localhost:8080";

function getToken() {
    return JSON.parse(localStorage.getItem("usuario")).token;
}

export function serviceListarPartidos() {
    var myHeaders = new Headers({ "Content-Type": "application/json" , 'Authorization': getToken() });

    const path = "/api/partidos/partidosUsuarios";

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

export function serviceListarPartido(id) {
    var myHeaders = new Headers({ "Content-Type": "application/json" , 'Authorization': getToken() });

    const path = "/api/partidos/partido/" + id;

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

export function serviceNuevoPartido(data) {
    var myHeaders = new Headers({ "Content-Type": "application/json" , 'Authorization': getToken() });

    const path = "/api/partidos/nuevoPartido";

    var miInit = {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(data)
    };

    return fetch(URL_API + path, miInit).then(response => {
        if (response.status !== 201) {
            return Promise.reject(response.status);
        }
        else {
            return response.json();
        }
    });
}

export function serviceActualizarPartido(data) {
    var myHeaders = new Headers({ "Content-Type": "application/json" , 'Authorization': getToken() });

    const path = "/api/partidos/actualizarPartido";

    var miInit = {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(data)
    };

    return fetch(URL_API + path, miInit).then(response => {
        if (response.status !== 201) {
            return Promise.reject(response.status);
        }
        else {
            return response.json();
        }
    });
}