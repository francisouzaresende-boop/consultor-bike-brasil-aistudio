# Consultor Bike Brasil 🚴🇧🇷

Seu assistente técnico inteligente focado no mercado de bicicletas do Brasil. Este projeto foi estruturado para desenvolvimento ágil e suporte para deploy gratuito e instantâneo na **Vercel** usando Serverless Functions.

---

## 🚀 Funcionalidades

- **Recomendação Customizada**: Baseando-se em altura, orçamento, frequência e terreno, o assistente indica modelos precisos do mercado brasileiro (como Oggi, Caloi, Soul, Specialized, Sense).
- **Sem chaves expostas no Frontend**: Toda a comunicação com a API do Gemini é realizada através de rotas do lado do servidor (Serverless).
- **Pronto para Deploy**: Perfeitamente preparado para rodar gratuitamente na nuvem da Vercel.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion (animações).
- **Backend / APIs**: Node.js, Express, @google/genai SDK (Gemini AI).
- **Plataforma de Deploy**: Vercel (Frontend Estático + Serverless Functions).

---

## 💻 Desenvolvimento Local

Para testar o projeto de forma local em seu computador, siga o passo a passo abaixo:

### 1. Clonar ou extrair o projeto
Certifique-se de ter os arquivos do projeto em seu diretório de preferência.

### 2. Configurar Variáveis de Ambiente
Escreva o arquivo `.env` na raiz do seu projeto a partir do exemplo fornecido:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e configure sua chave de API do Gemini obtida gratuitamente em [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=sua_chave_do_gemini_aqui
```

### 3. Instalar as Dependências
Instale todos os pacotes necessários:
```bash
npm install
```

### 4. Executar Servidor de Desenvolvimento
Inicie o servidor local integrado (Vite + Express):
```bash
npm run dev
```
O aplicativo carregará instantaneamente. Abra seu navegador no endereço: `http://localhost:3000`

---

## ☁️ Como Deployar Gratuitamente na Vercel

O projeto foi totalmente otimizado com a pasta `api/` na raiz para o sistema Serverless da Vercel. O deploy completo leva menos de 2 minutos e é **100% gratuito** (sem necessidade de cadastrar cartão ou configurar faturamento do Google Cloud!).

### Método 1: Pelo Vercel CLI (Recomendado e mais rápido)

1. Instale o CLI da Vercel globalmente (caso ainda não tenha):
   ```bash
   npm install -g vercel
   ```
2. Na raiz deste projeto, execute o comando de login:
   ```bash
   vercel login
   ```
3. Inicie o deploy executando na raiz:
   ```bash
   vercel
   ```
   * Siga as instruções em tela para vincular/criar um novo projeto.
   * Quando perguntado sobre as configurações de diretório e build (Vite), aceite o padrão sugerido pela Vercel.

4. Defina a variável de ambiente secreta no painel da Vercel:
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   *Cole a sua chave de API do Gemini.*

5. Publique para produção:
   ```bash
   vercel --prod
   ```

### Método 2: Pela Interface Web da Vercel (Vinculado ao GitHub)

1. Envie seu código para um repositório no seu GitHub.
2. Acesse o painel da [Vercel](https://vercel.com/) e monte um novo projeto a partir do repositório correspondente.
3. Nas configurações do projeto (**Settings > Environment Variables**), adicione:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: *Sua chave gerada no Google AI Studio.*
4. Clique em **Deploy**. A Vercel construirá e hospedará a aplicação automaticamente com segurança completa e certificados SSL gratuitos.

---

## ⚙️ Estrutura de Rotas Vercel Serverless

- **`/api/gemini`**: Rota que consome de forma segura de ponta a ponta o Gemini 3.5 Flash para selecionar e analisar as fichas dos ciclistas brasileiros sem expor segredos no lado do browser do usuário.
