/*
-------------------------------------------------------------------------
    FUNÇÕES
-------------------------------------------------------------------------    
*/

//Função para posicionar o elemento na tela
//recebe o parâmetro el que infoema qual elemento se desloca
const posicElemento = (el)=>{
    //sorteia um número para os posionamentos 
    let posX = Math.floor(Math.random()*960 + 40)
    let posY = Math.floor(Math.random()*alturaQuadro/2)


    el.style.position = 'absolute'
    el.style.left = -posX + 'px'
    el.style.top = posY + 'px'

}

//Funçao para deslocar os elementos na tela 
//parâmetros, elemento, velocidade e incremento 
const moveElemento = (el,veloc, inc)=> {
    //setInterval - repete uma função constantemente
    const anima = setInterval( ()=>{
        veloc = veloc + inc 
        el.style.left = veloc + 'px'
        //Verifica se saiu do quadro OU se possui a classe "morto", sai do quadro e retorna
        if(veloc > larguraQuadro || el.classList.contains('morto')){
            //redefine a velocidade e incremento
            veloc = -Math.random()*400+80
            inc = Math.random()*20+5
            posicElemento(el)
            //remove a classe "Morto" do elemento 
            el.classList.remove('morto')

        }
        //adiciona atributo "velocidade" aos elementos como valor de incremento
        el.setAttribute('velocidade', inc)
    },40 )


    

}


//Função para clicar no elemento - matar o elemento
const clickBug = (el)=>{
    let splash =  document.getElementById('splash')
    //captura posição do inseto ao ser clicado 
    let left = el.style.left
    let top = el.style.top
    //posiciona splash na mesma posição 
    splash.style.left = left
    splash.style.top = top
    //recarrega o gif animado 
    splash.src = `${splash.src}?a=${Math.random()}`

    let ponto = 10
    //se velocidade for maior que 20 ponto vale 100 e mostra a imagem "+100" (somente invasores)
    if(el.getAttribute('velocidade') > 20 && el.classList.contains('invasor') ){
        ponto = 100
        //exibe a imagem +100 na posição do inseto 
        let img100 = document.getElementById('pts100')
        img100.style.left = left
        img100.style.top = top
        //após 1/2 segundo muda o LEFT de img100 para '-5000px'
        setTimeout(() =>{
            img100.style.left = '-5000px'

        }, 500)
        
    }
    //se elemento for "Bonzinho" - classe bonzinho pontuação vale -50
    if(el.classList.contains('bonzinho')){
        ponto = -50 
    }


      //soma na pontuação geral e remove da tela
      //adiciona a classe "Morto"
      score += ponto
      el.classList.add('morto')
      document.getElementById('score').innerHTML = score

}

/*
----------------------------------------------------------------------------
    VARIÁVEIS, EVENTOS E EXECUÇÕES AUTOMÁTICAS
----------------------------------------------------------------------------
*/

//Variável com a lista de invasores (baseado na classe "invasor")
let invasores = document.querySelectorAll('.invasor')


//Variável com a lista de invasores (baseado na classe "bonzinho")
let bonzinhos = document.querySelectorAll('.bonzinho')


//variável para a pontuação ("Score")
let score = 0

//Tempo para a rodada, modifique a duração do jogo aqui 
let tempoRestante = 30

//Largura da tela. Importante para detectar se o inseto saiu de cena 
let larguraQuadro = document.getElementById('quadro').offsetWidth

//Altura do quadro
let alturaQuadro = document.getElementById('quadro').offsetHeight

//Comportamento de TODOS os invasores 
for (const inv of invasores) {
    let velocInicio = Math.floor(Math.random()*20 + 5)
    let incInicio   = Math.floor(Math.random()*10 + 5)
    posicElemento(inv)
    moveElemento(inv, velocInicio, incInicio)
    inv.addEventListener('mousedown', ()=>{ clickBug(inv) })
    
}

//Comportamento de TODOS os bonzinhos
for (const bom of bonzinhos) {
    let velocInicio = Math.floor(Math.random()*20 + 5)
    let incInicio   = Math.floor(Math.random()*10 + 5)
    posicElemento(bom)
    moveElemento(bom, velocInicio, incInicio)
    bom.addEventListener('mousedown', ()=>{ clickBug(bom) })
    
    
}

document.getElementById('infoTR').innerText = tempoRestante
document.getElementById('temporest').innerText = tempoRestante

//executa a cada segundo até atingir o valor da variável tempoRestante SETINTERVAL Após isso GAMEOVER
let tempo = tempoRestante
const tempoGame = setInterval( ()=>{
    //Mostra o tempo nos spans infoTR e teporest
    document.getElementById('infoTR').innerText = tempoRestante
    document.getElementById('temporest').innerText = --tempo
    //se tempo for igual a 0, fim de jogo e recarrega a página 
    if(tempo == -1){
        alert('GAMEOVER')
    
    //REGARREGA A PÁGINA (F5)
    location.reload(true)
}
},1000)






