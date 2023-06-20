function updateElderlyName(id) {
    urlPut = hostBack+'/elderly/update/'+id;
    let newName = span.children['name'];

    if (newName.value === '') {
        window.alert('O campo está vázio!');
    } else {
        const bodyPost = {'name': newName.value};

        fetch(urlPut, {
            method: "PUT",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(bodyPost)
        }).then(listElderly());
    };
};

function updateElderlyBirth(id) {
    urlPut = hostBack+'/elderly/update/'+id;
    let newBirth = span.children['birth'];

    if (newBirth.value === '') {
        window.alert('O campo está vázio!');
    } else {
        const bodyPost = {'birth': newBirth.value};

        fetch(urlPut, {
            method: "PUT",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(bodyPost)
        }).then(listElderly());
    };
};

function updateElderlyCpf(id) {
    urlPut = hostBack+'/elderly/update/'+id;
    urlGet = hostBack+'/elderly/list';
    let newCpf = span.children['cpf'];

    if (newCpf.value === '') {
        window.alert('O campo está vázio!');
    } else {
        const bodyPost = {'cpf': newCpf.value};

        fetch(urlGet).then((r) => r.json()).then((response) => {
            let cpfList = [];

            for (let res of response) {
                cpfList.push(res.cpf);
            };

            if (cpfList.includes(newCpf.value)) {
                window.alert('CPF duplicado!')
            } else {
                fetch(urlPut, {
                    method: "PUT",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify(bodyPost)
                }).then(listElderly());
            };
        });
    };
};



