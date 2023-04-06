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
        //Verifica se saiu do quadro e retorna 
        if(veloc > larguraQuadro){
            //redefine a velocidade e incremento
            veloc = -Math.random()*400+80
            inc = Math.random()*40+10
            posicElemento(el)

        }
    },40 )


    

}


//Função para clicar no elemento - matar o elemento


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
    
}

for (const bom of bonzinhos) {
    let velocInicio = Math.floor(Math.random()*20 + 5)
    let incInicio   = Math.floor(Math.random()*10 + 5)
    posicElemento(bom)
    moveElemento(bom, velocInicio, incInicio)
    
    
}




