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
            const html = `
            <h1>Dados de ${response.name}</h1>
            <p>Nome: ${response.name} <button onclick="popElderlyEditName('${response.id}')">Editar</button></p>
            <p>Data de nascimento: ${response.birth} <button onclick="popElderlyEditBirth('${response.id}')">Editar</button></p>
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
            <p>Nome: ${response.name}</p>
            ${
                (response.isControled === 'sim') ? (`<p>O remédio é controlado!</p>`) : (`<p>O remédio não é controlado!</p>`)
            }
            <br>
            <button onclick="span.style.visibility = 'hidden'">Fechar</button>
            `;
            

            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    };
};

function popElderlyRemedy(id) {
    span.style.height = '250px';
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
                    }</p>
                `;
            };

            html += `<button onclick="span.style.visibility = 'hidden'">Fechar</button>`

            span.innerHTML = html;
            span.style.visibility = 'visible';
        });
    };
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








// document.addEventListener('click', () => span.style.visibility = 'hidden');



