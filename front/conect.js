const formCadElderly = document.querySelector('form.elderly');
const formCadRemedy = document.querySelector('form.remedy');
const elderlyList = document.querySelector('ul.elderly');
const remedyList = document.querySelector('ul.remedy');
const hostBack = 'http://localhost:3000';




function registerElderly() {
    let name = formCadElderly.children['name'].value;
    let birth = formCadElderly.children['birth'].value;
    let cpf = formCadElderly.children['cpf'].value;
    const bodyPost = {
        'name': name,
        'birth': birth,
        'cpf': cpf
    };

    if (name === '' || birth === '' || cpf === ''){
        window.alert('Preencha todos os campos!');
    } else {
        let urlGet = hostBack+'/elderly/list';
        let urlPost = hostBack+'/elderly/create';

        fetch(urlGet).then((r) => r.json()).then((response) => {
            let cpfList = [];

            for (let res of response) {
                cpfList.push(res.cpf);
            };

            if (cpfList.includes(cpf)) {
                window.alert('CPF duplicado!')
            } else {
                fetch(urlPost, {
                    method: "POST",
                    headers:{ "Content-Type": "application/json" },
                    body: JSON.stringify(bodyPost)
                }).then(listElderly());
            };
        });
    };
};

function listElderly(){
    urlGet = hostBack+'/elderly/list';
    elderlyList.innerHTML = '';

    fetch(urlGet).then((r) => r.json()).then((response) => {
        for (data of response) {
            elderlyList.innerHTML += `<li onclick="popElderly('${data.id}')">${data.name}</li>`
        };
    });
};

function deleteElderly(id) {
    url = hostBack+'/elderly/delete/'+id;
    fetch(url, {
        method: "DELETE"
    }).then(() => span.style.visibility = 'hidden').then(() => listElderly());
};


// remedy

function registerRemedy() {
    urlPost = hostBack+'/remedy/create'
    let isControled = formCadRemedy.children['controled'].checked;
    let name = formCadRemedy.children['name'].value;
    let bodyPost = {
        "name": name,
        "isControled": (isControled) ? ('sim') : ('nao')
    };


    if (name === ''){
        window.alert('Preencha todos os campos');
    } else {
        fetch(urlPost, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyPost)
        });
    };
};

function listRemedy() {
    urlGet = hostBack+'/remedy/list';
    remedyList.innerHTML = '';

    fetch(urlGet).then((r) => r.json()).then((response) => {
        for (data of response) {
            remedyList.innerHTML += `<li onclick="popRemedy('${data.id}')">${data.name}</li>`;
        };
    });
};

function deleteRemedy(id) {
    url = hostBack+'/remedy/delete/'+id;
    fetch(url, {
        method: "DELETE"
    }).then(() => span.style.visibility = 'hidden').then(() => listRemedy());
};


// elderly remedy


function removeElderlyRemedy(elderlyID, remedyID) {
    url = hostBack + '/elderly/' + elderlyID + '/remedy/delete/' + remedyID;

    fetch(url, {
        method: "DELETE",
    }).then(() => span.style.visibility = 'hidden').then(() => listElderly());
};



