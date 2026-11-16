# Clémerson B. Pessalli — Portfólio

[![Site](https://img.shields.io/badge/site-clemersonbp.github.io-111?style=flat-square&logo=githubpages&logoColor=white)](https://clemersonbp.github.io)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Site pessoal e portfólio de **Clémerson B. Pessalli**, desenvolvedor fullstack.
Reúne os produtos que desenvolvi e mantenho em produção, minha trajetória profissional e
a stack com que trabalho no dia a dia.

**Acesse:** [clemersonbp.github.io](https://clemersonbp.github.io)

![Página inicial do portfólio](assets/img/preview.png)

## Projetos em destaque

| Projeto | Descrição | Stack principal |
| --- | --- | --- |
| [**BladesPro**](https://bladespro.com.br) | SaaS de gestão para barbearias, multi-tenant, com agenda online, assinaturas recorrentes via Stripe, permissões por perfil e relatórios de faturamento. | Next.js, NestJS, Prisma, PostgreSQL, Stripe, Docker |
| [**My Baby List**](https://mybabylist.cloud) | Listas de presentes para chá de bebê, com reserva em tempo real, login com Google, ativação paga via Mercado Pago e privacidade dos presenteadores. | Next.js, React, Prisma, PostgreSQL, NextAuth, Mercado Pago |

Os dois produtos foram desenvolvidos do zero por mim, do banco de dados ao deploy, e rodam
em uma VPS própria com Docker e CI/CD pelo GitHub Actions.

## Conteúdo do site

- **Início:** apresentação e links de contato
- **Projetos:** detalhes, funcionalidades e tecnologias de cada produto
- **Experiência:** trajetória profissional
- **Formação:** formação acadêmica
- **Tecnologias:** stack organizada por área (frontend, backend e dados, pagamentos e integrações, DevOps e infraestrutura)
- **Contato:** e-mail com cópia em um clique, LinkedIn e GitHub

## Destaques técnicos

- **Sem frameworks nem build:** HTML, CSS e JavaScript puros, servidos direto pelo GitHub Pages.
- **Tema claro e escuro:** segue a preferência do sistema, permite troca manual salva no
  `localStorage` e é aplicado antes da renderização, sem flash de tema errado.
- **Responsivo:** layout ajustado para desktop, tablet e celular, com menu mobile acessível.
- **Ícones embutidos:** sprite SVG inline com ícones [Lucide](https://lucide.dev) e logos
  [Simple Icons](https://simpleicons.org), sem requisições extras.
- **Navegação:** destaque da seção atual no header e animações de entrada com
  `IntersectionObserver`.
- **Acessibilidade:** HTML semântico, rótulos ARIA, foco visível e respeito a
  `prefers-reduced-motion`.
- **Performance:** imagens com `loading="lazy"` e dimensões declaradas, além de cache busting
  por versão (`?v=N`) nos arquivos CSS e JS.

## Estrutura

```text
clemersonbp.github.io/
├── index.html            # Página única com todas as seções e o sprite SVG
├── css/
│   └── styles.css        # Tokens de design, temas, layout e componentes
├── js/
│   └── scripts.js        # Tema, menu mobile, seção ativa, animações e cópia do e-mail
└── assets/
    └── img/
        ├── profile_clemerson.jpg
        ├── preview.png   # Captura usada neste README
        └── projetos/     # Capturas de tela do BladesPro e do My Baby List
```

## Executando localmente

O site é estático e não tem dependências. Basta servir a pasta com qualquer servidor HTTP:

```bash
git clone https://github.com/clemersonbp/clemersonbp.github.io.git
cd clemersonbp.github.io
python -m http.server 5500
```

Depois, acesse `http://localhost:5500`.

> Ao alterar `styles.css` ou `scripts.js`, incremente o parâmetro `?v=` no `index.html`
> para que os visitantes recebam a versão nova em vez da que está em cache.

## Deploy

A publicação é feita pelo **GitHub Pages** a partir da branch `master`. Cada push atualiza o
site em [clemersonbp.github.io](https://clemersonbp.github.io).

## Contato

- LinkedIn: [linkedin.com/in/clemersonbp](https://www.linkedin.com/in/clemersonbp)
- GitHub: [github.com/clemersonbp](https://github.com/clemersonbp)

## Licença

O código-fonte pode ser consultado e usado como referência. Textos, fotos e capturas de tela
dos projetos são de uso pessoal e não devem ser reutilizados sem autorização.
