document.addEventListener('DOMContentLoaded', () => {

    let conteudo = document.querySelector('#conteudo');
    let abrir = document.querySelector('#abrir')
    abrir.addEventListener('click', () => {
        conteudo.classList.add('sumir');

        setTimeout(() => {
            conteudo.style.display = 'none'
        }, 1000)
    })

})