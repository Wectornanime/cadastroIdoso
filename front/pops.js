const span = document.querySelector('span.popInfo');
const host = 'http://localhost:3000';



function popElderly(id) {
    span.style.height = '250px';
    if (id === 'teste'){
        const html = `
            <h1>Dados de Teste</h1>
            <p>Nome: Teste <button>Editar</button></p>
            <p>Data de nascimento: 00-00-0000 <button>Editar</button></p>
            <p>CPF: 111.222.333-00 <button>Editar</button></p>
            <br>
            <div>
                <button>Listar remédios</button>
                <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            </div>
            `;
            
        span.innerHTML = html;
        span.style.visibility = 'visible';

    } else {
        url = host+'/elderly/list/'+id;
        fetch(url).then((r) => r.json()).then((response) => {
            response = response[0];
            
            const monthAbb = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthConverted= ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

            const birthDay = response.birth.split(' ')[1];
            const birthMonth = monthConverted[ monthAbb.indexOf(response.birth.split(' ')[2]) ];
            const birthYear = response.birth.split(' ')[3];

            const birthConverted = `${birthDay} de ${birthMonth} de ${birthYear}`

            const html = `
            <h1>Dados de ${response.name}</h1>
            <p>Nome: ${response.name} <button onclick="popElderlyEditName('${response.id}')">Editar</button></p>
            <p>Data de nascimento: ${birthConverted} <button onclick="popElderlyEditBirth('${response.id}')">Editar</button></p>
            <p>CPF: ${response.cpf} <button onclick="popElderlyEditCpf('${response.id}')">Editar</button></p>
            <br>
            <button onclick="popElderlyRemedy('${response.id}')">Listar remédios</button>
            <button onclick="deleteElderly('${response.id}')">Deletar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
            
            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    };
        
    // const html = `
    // <h1>Dados de ${name}</h1>
    // <p>Nome: ${name}</p>
    // <p>Data de nascimento: ${birth}</p>
    // <p>CPF: ${cpf}</p>
    // `;
    
};

function popRemedy(id) {
    span.style.height = '250px';
    if (id === 'teste') {
        const html = `
            <h1>Dados do remédio Teste</h1>
            <p>Nome: Teste</p>
            <p>O remédio não é controlado!</p>
            <br>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
            
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {
        url = hostBack+'/remedy/list/'+id;
        fetch(url).then((r) => r.json()).then((response) => {
            response = response[0];
            const html = `
            <h1>Dados do remédio</h1>
            <p>Nome: ${response.name} <button onclick="popRemedyEditName('${response.id}')">Editar</button></p>
            <p>${
                (response.isControled === 'sim') ? (`O remédio é controlado!`) : (`O remédio não é controlado!`)
            } <button onclick="popRemedyEditIsControled('${response.id}')">Editar</button></p>
            <br>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            <button onclick="deleteRemedy('${response.id}')">Deletar</button>
            `;
            

            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    };
};

function popElderlyRemedy(id) {
    span.style.height = '350px';
    const url = hostBack + '/elderly/' + id + '/remedy/list/';

    if (id === 'teste') {
        const html = `
            <h1>Lista de remédios</h1>
            <p>Nome &bull; Não controlado</p>
            <p>Nome &bull; Controlado</p>
            <br>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {
        fetch(url).then((r) => r.json()).then((response) => {
            let html = '<h1>Lista de remédios</h1>';
            for (data of response) {
                html += `
                    <p>${data.name} &bull; ${
                        (data.isControled === 'sim') ? ('Controlado') : ('Não controlado')
                    } <button onclick="removeElderlyRemedy('${id}', '${data.id}')">Remover</button></p>
                `;
            };

            html += `
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            <button onclick="popElderlyAddRemedy('${id}')">Adicionar</button>
            `;

            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    };
};

function popElderlyAddRemedy(elderlyID) {
    let urlGetElderly = hostBack + '/elderly/list/' + elderlyID;
    let urlGetRemedy = hostBack + '/remedy/list/';
    
    span.style.height = '350px';
    let html = '<h1>Adicionar Remédios</h1>';

    fetch(urlGetElderly).then((r) => r.json()).then((response) => {
        response = response[0];
        let remedyList = [];
        for (remedy of response.remedys) {
            remedyList.push(remedy.id);
        };

        fetch(urlGetRemedy).then((r) => r.json()).then((response) => {
            for (remedy of response) {
                if (!remedyList.includes(remedy.id)) {
                    html += `
                    <input type="checkbox" id="${remedy.id}">
                    <label for="${remedy.id}">${remedy.name}</label>
                    <br>
                    `;
                };
            };

            html += `
            <button onclick="elderlyAddRemedy('${elderlyID}')">Adicinar todos</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;

            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    });
};


function popElderlyEditName(id) {
    span.style.height = '200px';

    if (id === 'teste') {
        const html = `
        <h1>Editar nome</h1>
        <input type="text" id="name" placeholder="Nome">
        <br>
        <button>Atualizar</button>
        <button onclick="span.style.visibility = 'hidden'">Fechar</button>
        `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {

        html = `
            <h1>Editar nome</h1>
            <input type="text" id="name" placeholder="Nome">
            <br>
            <button onclick="updateElderlyName('${id}')">Atualizar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    };
};

function popElderlyEditBirth(id) {
    span.style.height = '200px';

    if (id === 'teste') {
        const html = `
        <h1>Editar data de nascimento</h1>
        <input type="date" id="birth">
        <br>
        <button>Atualizar</button>
        <button onclick="span.style.visibility = 'hidden'">Fechar</button>
        `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {

        html = `
            <h1>Editar data de nascimento</h1>
            <input type="date" id="birth">
            <br>
            <button onclick="updateElderlyBirth('${id}')">Atualizar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    };
};

function popElderlyEditCpf(id) {
    span.style.height = '200px';

    if (id === 'teste') {
        const html = `
        <h1>Editar CPF</h1>
        <input type="text" id="cpf" placeholder="CPF">
        <br>
        <button>Atualizar</button>
        <button onclick="span.style.visibility = 'hidden'">Fechar</button>
        `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {

        html = `
            <h1>Editar CPF</h1>
            <input type="text" id="cpf" placeholder="CPF">
            <br>
            <button onclick="updateElderlyCpf('${id}')">Atualizar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    };
};

function popRemedyEditName(id) {
    span.style.height = '200px';

    if (id === 'teste') {
        const html = `
        <h1>Editar nome</h1>
        <input type="text" id="name" placeholder="Nome">
        <br>
        <button>Atualizar</button>
        <button onclick="span.style.visibility = 'hidden'">Fechar</button>
        `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {

        html = `
            <h1>Editar nome</h1>
            <input type="text" id="name" placeholder="Nome">
            <br>
            <button onclick="updateRemedyName('${id}')">Atualizar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    };
};


function popRemedyEditIsControled(id) {
    span.style.height = '200px';

    if (id === 'teste') {
        const html = `
        <h1>Editar nome</h1>
        <input type="text" id="name" placeholder="Nome">
        <br>
        <button>Atualizar</button>
        <button onclick="span.style.visibility = 'hidden'">Fechar</button>
        `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    } else {

        html = `
            <h1>Editar controle do remédio</h1>
            <label for="control">É controlado? </label>
            <br>
            <input type="radio" name="control" id="controled" value="sim">
            <label for="controled">Sim</label>
            <input type="radio" name="control" id="notControled" value="nao" checked>
            <label for="notControled">Não</label>
            <br>
            <button onclick="updateRemedyIsControled('${id}')">Atualizar</button>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
        
        span.innerHTML = html;
        span.style.visibility = 'visible';
    };
};









// document.addEventListener('click', () => span.style.visibility = 'hidden');



