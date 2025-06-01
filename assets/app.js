let backgroundAudio = new Audio('assets/audios/background.mp3');
backgroundAudio.loop = true;
backgroundAudio.volume = 0.05;
backgroundAudio.play();

document.addEventListener('DOMContentLoaded', () => {
    let conteudo = document.querySelector('#conteudo');
    let abrir = document.querySelector('#abrir');
    let paginas = document.querySelector('#paginas');

    abrir.addEventListener('click', () => {
        conteudo.classList.add('sumir');

        setTimeout(() => {
            conteudo.style.display = 'none';
            paginas.style.display = 'flex';

            const pagina = document.querySelectorAll('.pagina');
            let audioAtual = null;

            function fadeOut(audio, duracao = 2000, callback) {
                let vol = audio.volume;
                const step = 0.05;
                const intervalo = duracao / (vol / step);

                const fade = setInterval(() => {
                    if (vol > 0) {
                        vol -= step;
                        if (vol < 0) vol = 0;
                        audio.volume = vol;
                    } else {
                        clearInterval(fade);
                        audio.pause();
                        if (callback) callback();
                    }
                }, intervalo);
            }

            function mostrarPaginasUmaPorVez(listaDePaginas) {
                let index = 0;

                function mostrarProxima() {
                    listaDePaginas.forEach(p => {
                        p.style.display = 'none';
                    });

                    if (index < listaDePaginas.length) {
                        const paginaAtual = listaDePaginas[index];
                        paginaAtual.style.display = 'flex';
                        paginaAtual.classList.add('aparecer');

                        // Se for a mensagem final (última página), não tem áudio
                        if (index === listaDePaginas.length - 1) {
                            if (audioAtual) {
                                fadeOut(audioAtual, 2000);
                            }
                            return; // Para aqui, não avança mais
                        }

                        const audioSrc = paginaAtual.dataset.audio;
                        if (audioSrc) {
                            const novoAudio = new Audio(audioSrc);
                            novoAudio.volume = 1;

                            novoAudio.addEventListener('loadedmetadata', () => {
                                const duracaoAudio = novoAudio.duration * 1000;

                                if (audioAtual) {
                                    fadeOut(audioAtual, 2000, () => {
                                        audioAtual = novoAudio;
                                        audioAtual.play();
                                    });
                                } else {
                                    audioAtual = novoAudio;
                                    audioAtual.play();
                                }

                                index++;
                                setTimeout(() => {
                                    fadeOut(audioAtual, 2000, mostrarProxima);
                                }, duracaoAudio);
                            });

                            novoAudio.load();
                        } else {
                            // Se não tem áudio, avança depois de 5 segundos
                            index++;
                            setTimeout(mostrarProxima, 5000);
                        }
                    }
                }

                mostrarProxima();
            }

            mostrarPaginasUmaPorVez(pagina);

        }, 1000);
    });
});