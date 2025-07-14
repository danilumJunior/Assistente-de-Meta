const apiKeyInput = document.getElementById('apiKey')
const gameSelect = document.getElementById('gameSelect')
const questionInput = document.getElementById('questionInput')
const askButton = document.getElementById('askButton')
const aiResponse = document.getElementById('aiResponse')
const form = document.getElementById('form')

const markdownToHtml = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}

const perguntarIA = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash"
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`


    const perguntaLeagueOfLegends = `
    
    ## Especialidade 

    Você é um especialista e tem uma inteligência nesse jogo ${game}

    ## Tarefa

    - Você deve responder as pergutnas do usuario com base no seu conhecimento do jogo, estratégias, build e dicas a depender do jogo.
    - Você será capaz de olhar o historico do usuario fornecido e com o objetivo de responder as perguntas dele, diga as matchups, builds, e como melhorar no jogo caso seja perguntado.
    - Caso o usuário pedir informações sobre algum jogador especifico. Considere sites de builds , historicos para fazer a sua pesquisa, como por exemplo. 
    https://www.leagueofgraphs.com, https://dpm.lol e https://op.gg. Foque em responder a pergunta do usuário trazendo as informações pedidas.
    - Considere o nome do usuário e a tag fornecida para realizar as buscas. Exemplo: usuario#123. Com isso em mãos será capaz de pesquisar a conta sugerida.

    ## Regras

    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com ' Essa pergunta não está relacionada ao jogo'
    - Considera a data atual para realizar as pesquisas ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta mais coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.
    - SEMPRE que for fazer a resposta, confira os dados apresentados com a data atual e o patch atual.
    - Sempre responda em português, caso, o nome do item esteja em inglê, mas nunca invente palavras.
    - Caso não esteja sendo capaz de procurar pela a tag do jogador fornecida, tente trocar o # pelo -, para ser mais fiel na aba de pesquisa como por exemplo https://op.gg/lol/summoners/br/Toffy-0605.
    - O jogador citado não precisa ser um proplayer, mas, somente um random em que o usuário esteja procurando, faça essa busca e devolva com a resposta.
    
    ## Resposta

    Economize na resposta, seja direto e responda no máximo 500 caracteres. Responda em markdown.

    ## Exemplo de resposta

    - Pergunta do usuário: Melhor build rengar jungle.
    - resposta: A build mais atual é: \n\n **Itens:**\n\n 
    coloque os itens aqui. \n\n**Runas:**\n\n
    Exemplo de runas\n\n

    - Sempre seja especifico na resposta, separe os itens por linha, sempre diga o tempo de compra do item, caso ele seja de inicio de jogo ou fim de jogo. E explique itens situacionais

    ---
    Aqui esta a pergunta do usuário: ${question}

    `

    const perguntaValorant = `
    ## Especialidade

    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa

    - Você deve responder as perguntas do usuario com base no seu conhecimento do jogo. 
    - Estratégias, comps que seja melhor em cada mapa, melhores agentes em cada mapa. 
    - Pixels de agentes e mande o link do vídeo do agente escolhido mudando o nome da URL pelo o nome do agente.

    ## Regras

    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com ' Essa pergunta não está relacionada ao jogo'
    - SEMPRE que for fazer a resposta, confira os dados apresentados com a data atual e o patch atual.
    - Sempre responda em português, caso, o nome do item esteja em inglês, mas nunca invente palavras.
    - Considera a data atual para realizar as pesquisas ${new Date().toLocaleDateString()}
    - Não precisa colocar [] nas respostas.
    - Procure sempre vídeos disponíveis no youtube e mande o link referente.
    - Não crie vídeos com o tema da pergunta e sempre procure por vídeos disponiveis ao publico.
    - Esteja familarizado com as girías do jogo.
    ## Resposta

    Economize na resposta, seja direto e responda no máximo 500 caracteres. Responda em markdown.

     ## Exemplo de resposta

    - Pergunta do usuário: Melhor comp para ascent.
    - resposta: A comp mais usada é \n\n**Agentes**\n\n responda os agentes

    - Caso o usuário pergunte pixels de skill, responda com o link do vídeo do youtube com o nome do Agente escolhido.

    - Pergunta do usuário: Pixels de sova no mapa ascent.
    - Resposta: Os pixels mais usado no mapa ascent são esses \n\n**Pixeis**\n\n E fale o link do vídeo aqui

    - Sempre seja especifico na resposta, separe os agentes por linha. 
    - Explique os agentes selecionados e em cada bomb utilizar.
    
    ---
     Aqui esta a pergunta do usuário: ${question}
    `

    const perguntaGenerica = `
     ## Especialidade
    Você é um assistente de jogos com conhecimento sobre ${game}.

    ## Tarefa
    Responda à pergunta do usuário baseando-se no seu conhecimento geral sobre o jogo ${game}.
    Se a pergunta não for clara ou não for sobre o jogo, peça para reformular.

    ---
    Aqui está a pergunta do usuário: ${question}
    `


    let pergunta = ''

    if (game == 'Valorant') {
        pergunta = perguntaValorant
    } else if (game == 'Lol') {
        pergunta = perguntaLeagueOfLegends
    } else {
        pergunta = perguntaGenerica
        console.warn(`Usando prompt genérico para o jogo: ${game}`)

    }

    const contents = [{

        role: "user",

        parts: [{
            text: pergunta
        }]
    }]


    const tools = [{
        google_search: {}
    }]


    const response = await fetch(geminiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
}


const sendForm = async (event) => {
    event.preventDefault()
    const apiKey = apiKeyInput.value
    const game = gameSelect.value
    const question = questionInput.value


    if (apiKey == '' || game == '' || question == '') {
        alert('Por favor, preencha todos os campos!')
        return
    }

    askButton.disabled = true
    askButton.textContent = 'Perguntando...'
    askButton.classList.add('loading')


    try {
        const text = await perguntarIA(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHtml(text)
        aiResponse.classList.remove('hidden')
    } catch (error) {
        console.log('Erro: ', error)
    } finally {
        askButton.disabled = false
        askButton.textContent = "Perguntar"
        askButton.classList.remove('loading')

    }
}



form.addEventListener('submit', sendForm)