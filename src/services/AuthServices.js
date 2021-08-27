const URL_API = "http://localhost:8080";

export function serviceRegister(data) {
    var myHeaders = new Headers({ "Content-Type": "application/json" });

    const path = "/api/usuarios/nuevoUsuario";

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

export function serviceLogin(data) {
    var myHeaders = new Headers({ "Content-Type": "application/json"});

    const path = "/auth/login";

    var miInit = {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify(data)
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