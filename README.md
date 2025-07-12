# 🎮 Game Meta Assistant

Este projeto é um assistente de meta interativo que utiliza a API do Google Gemini para responder a perguntas sobre estratégias, builds e dicas para jogos específicos. O usuário pode selecionar um jogo, inserir uma pergunta e receber uma resposta gerada por inteligência artificial. Este projeto foi desenvolvido durante a aula da ROCKETESEAT.

---

## 🚀 Funcionalidades

- **Seleção de Jogo**: Escolha entre jogos como Valorant, League of Legends (LoL) e outros (com um prompt genérico).
- **Perguntas Dinâmicas**: Faça perguntas sobre estratégias, builds, agentes, pixels, e a IA tentará fornecer respostas relevantes com base no contexto do jogo.
- **Respostas em Markdown**: As respostas da IA são formatadas em Markdown e convertidas para HTML para uma melhor visualização.
- **Validação de Formulário**: Garante que todos os campos necessários sejam preenchidos antes de enviar a pergunta.
- **Feedback Visual**: O botão "Perguntar" indica quando a IA está processando a requisição, e a área de resposta aparece dinamicamente.
- **Tratamento de Erros**: Inclui tratamento de erros robusto para problemas na comunicação com a API.

---

## ⚙️ Como Usar

### 1. Obtenha sua API Key do Google Gemini

- Vá para o [Google Cloud Console](https://console.cloud.google.com/).
- Crie um novo projeto, se necessário.
- Navegue até **APIs & Services** > **Credentials**.
- Crie uma nova **API Key**.

**Importante**: Certifique-se de que o faturamento esteja ativado para o seu projeto, pois a API do Gemini exige isso.

> 💡 Considere restringir sua chave de API a domínios específicos (CORS) para maior segurança, especialmente em produção.

---

### 2. Estrutura do Projeto

Crie a seguinte estrutura de arquivos no seu diretório:

```
.
├── index.html
├── script.js
├── styles.css
└── img/
├── logo.png
└── favicon.ico (opcional, para o ícone da aba do navegador)
```


---

### 3. Abra o index.html

Basta abrir o arquivo `index.html` em seu navegador web preferido.

---

### 4. Configure a API Key

No campo **"Informe API KEY do Gemini"** na interface do aplicativo, cole a chave de API que você obteve no Google Cloud Console.

---

### 5. Selecione o Jogo e Faça a Pergunta

- Escolha um jogo na lista suspensa (Valorant, League of Legends, Fortnite).
- Digite sua pergunta no campo de texto.
- Clique em **"Perguntar"**.

---

