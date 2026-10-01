# Psicóloga Adriana Beserra: site one-page

Re-design do site da psicóloga Adriana Beserra (TCC, Mauá, Vila Prudente e online).
HTML + CSS + JS puro, com Tailwind CSS via CDN. Sem build e sem bundler.

## Estrutura

```
.
├── index.html
├── favicon.ico / favicon-32.png / apple-touch-icon.png / icon-192.png / icon-512.png
├── assets/
│   ├── css/style.css        # tokens, componentes e animações
│   ├── js/main.js           # CTAs de WhatsApp, menu, scroll-reveal, analytics
│   └── img/
│       ├── logo.png             # logo ORIGINAL do cliente, sem alterações
│       ├── logo-web.png         # o mesmo logo, recortado nas bordas e reduzido
│       ├── logo-transparent.png # o mesmo logo, recortado nas bordas
│       ├── adriana-*.webp       # fotos otimizadas
│       └── og-image.jpg         # prévia para WhatsApp/Instagram (1200x630)
└── README.md
```

## Rodar localmente

Abra o `index.html` no navegador ou sirva a pasta:

```bash
npx serve .
# ou
python -m http.server 8080
```

## Configurar o rastreamento

Em `assets/js/main.js`, preencha no topo:

```js
const GA_ID = 'G-XXXXXXXXXX';   // Google Analytics 4
const META_PIXEL_ID = '';        // Meta Pixel
```

Enquanto estiverem vazios, nenhum script de terceiros é carregado.
Cada clique em CTA dispara o evento `whatsapp_click` com a seção de origem (`secao`) e a mensagem enviada.

## Editar as mensagens de WhatsApp

Cada CTA tem `data-wa="mensagem"` e `data-wa-place="seção"` no `index.html`.
O número fica em `WHATSAPP`, no `main.js`.

## Deploy

**GitHub Pages**
1. `git init && git add . && git commit -m "Site Adriana Beserra"`
2. Crie o repositório no GitHub e faça o push.
3. Em Settings → Pages, escolha a branch `main` e a pasta `/ (root)`.

**Netlify / Vercel / Cloudflare Pages:** conecte o repositório. Não há build: publique a raiz (`/`).

**Hospedagem tradicional:** envie o conteúdo da pasta por FTP para o `public_html`.

Depois de publicar, confirme que a URL canônica e a `og:image` no `<head>` apontam para o domínio final
(`https://adrianabeserrapsicologa.com.br/`). Teste a prévia no depurador de compartilhamento do Facebook/WhatsApp.

## Pendências de conteúdo

- **E-mail:** não existe no site nem no Google, então foi omitido do rodapé. Adicione se o cliente quiser.
- **CRP:** o número do registro não aparece no site original. Psicólogos costumam exibi-lo; confirmar com a cliente.
- **Valores dos planos:** não divulgados (regra do CFP). Todos os CTAs levam ao WhatsApp. A descrição de cada plano é genérica e precisa ser validada pela cliente.
- **Endereço de Vila Prudente:** apenas a região é citada. Não há endereço publicado.
- **Analytics:** IDs vazios até a TeoCode/cliente fornecerem.

© 2026 TeoCode
