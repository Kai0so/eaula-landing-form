# Landing Page de Inscrição para Estágio

Este é um projeto de uma landing page moderna e responsiva para inscrição de estudantes em vagas de estágio, construída com React.js, Vite, Tailwind CSS e Firebase.

## ✨ Features

-   Design limpo e moderno (mobile-first)
-   Formulário de inscrição com validação em tempo real
-   Integração com Firebase (Firestore) para armazenamento de dados
-   Feedback visual para o usuário (loading, sucesso, erro)
-   Animações sutis com Framer Motion

## 🧱 Tecnologias Utilizadas

-   [React.js](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Firebase](https://firebase.google.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Framer Motion](https://www.framer.com/motion/)
-   [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/vaga-estagio-app.git](https://github.com/seu-usuario/vaga-estagio-app.git)
    cd vaga-estagio-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo `.env.local` na raiz do projeto.
    -   Adicione suas credenciais do Firebase a este arquivo, seguindo o exemplo do `.env.example` (que você pode criar).

    ```
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    # ...e as outras chaves
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`.

## 📦 Deploy

Para fazer o deploy, você pode usar serviços como Vercel ou Netlify.

1.  Conecte seu repositório do GitHub ao serviço escolhido.
2.  Configure o comando de build: `npm run build`
3.  Configure o diretório de publicação: `dist`
4.  **Importante:** Adicione as mesmas variáveis de ambiente (do seu arquivo `.env.local`) nas configurações do projeto na Vercel/Netlify.