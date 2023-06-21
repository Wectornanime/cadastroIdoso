const mainContent = document.querySelector('.content');
const inputCpf = document.querySelector('input#cpf');
let spanCpf = document.querySelector('span').children['cpf'];

function swap(sec) {
    let width = 710
    mainContent.style.transform = `translateX(-${sec * width}px)`;
    listElderly();
    listRemedy();
};
    
inputCpf.addEventListener('keypress', (char) => {
    const permitList = '1234567890-.';

    if (!permitList.includes(char.key)) {
        char.preventDefault()
    } else if ((char.key != '-') && (inputCpf.value.length === 3 || inputCpf.value.length === 7 )) {
        if (char.key != '.'){
            char.preventDefault();
            inputCpf.value += '.';
            inputCpf.value += char.key;
        };
    } else if ((char.key != '.') && (inputCpf.value.length === 11)) {
        if (char.key != '-'){
            char.preventDefault();
            inputCpf.value += '-';
            inputCpf.value += char.key;
        };
    } else if ((char.key === '.' || char.key === '-') && (inputCpf.value.length != 3 || inputCpf.value.length != 7 || inputCpf.value.length != 11)) {
        char.preventDefault();
    };
});


function eventEditCpf(){
    let spanCpf = document.querySelector('span').children['cpf'];
    spanCpf.addEventListener('keypress', (char) => {
        const permitList = '1234567890-.';
    
        if (!permitList.includes(char.key)) {
            char.preventDefault()
        } else if ((char.key != '-') && (spanCpf.value.length === 3 || spanCpf.value.length === 7 )) {
            if (char.key != '.'){
                char.preventDefault();
                spanCpf.value += '.';
                spanCpf.value += char.key;
            };
        } else if ((char.key != '.') && (spanCpf.value.length === 11)) {
            if (char.key != '-'){
                char.preventDefault();
                spanCpf.value += '-';
                spanCpf.value += char.key;
            };
        } else if ((char.key === '.' || char.key === '-') && (spanCpf.value.length != 3 || spanCpf.value.length != 7 || spanCpf.value.length != 11)) {
            char.preventDefault();
        };
    });
};

