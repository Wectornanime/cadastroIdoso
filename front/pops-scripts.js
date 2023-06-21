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
        }).then(() => span.style.visibility = 'hidden').then(() => listElderly()).then(() => window.alert('Registro alterado com sucesso!'));
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
        }).then(() => span.style.visibility = 'hidden').then(() => listElderly()).then(() => window.alert('Registro alterado com sucesso!'));
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
                }).then(() => span.style.visibility = 'hidden').then(() => listElderly()).then(() => window.alert('Registro alterado com sucesso!'));
            };
        });
    };
};

function updateRemedyName(id) {
    urlPut = hostBack+'/remedy/update/'+id;
    let newName = span.children['name'];

    if (newName.value === '') {
        window.alert('O campo está vázio!');
    } else {
        const bodyPost = {'name': newName.value};

        fetch(urlPut, {
            method: "PUT",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify(bodyPost)
        }).then(() => span.style.visibility = 'hidden').then(() => listRemedy()).then(() => window.alert('Registro alterado com sucesso!'));
    };
};

function updateRemedyIsControled(id) {
    urlPut = hostBack+'/remedy/update/'+id;
    let newValue = span.children['control'].checked;

    const bodyPost = {'isControled': (newValue) ? ('sim') : ('nao')};

    fetch(urlPut, {
        method: "PUT",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify(bodyPost)
    }).then(() => span.style.visibility = 'hidden').then(() => listRemedy()).then(() => window.alert('Registro alterado com sucesso!'));
};

function elderlyAddRemedy(elderlyID) {
    const urlPost = hostBack + '/elderly/' + elderlyID + '/remedy/create/';
    let remedyList = [];

    for (let children of span.children) {
        if (children.tagName === 'INPUT' && children.checked) {
            remedyList.push(children.id);
        };
    };

    const body = {"remedys": remedyList};

    fetch(urlPost, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
    }).then(() => span.style.visibility = 'hidden').then(() => window.alert('Registrado com sucesso!'));
};

