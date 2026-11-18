# Disk Digital — site institucional (demonstração)

Projeto da UXDriven para a Disk Digital, gráfica em San Martin, Recife/PE.

## Estrutura

- `index.html`: estrutura, conteúdo, SEO e dados estruturados locais.
- `style.css`: identidade visual, grid e responsividade.
- `script.js`: menu móvel, filtros de soluções, FAQ, animações e montagem do orçamento via WhatsApp.
- `assets/disk-digital-logo.png`: logomarca original fornecida pelo cliente, sem alterações.

## Publicação na Vercel

1. Importe o repositório `UXDriven/cliente-diskdigital` como um novo projeto.
2. Escolha **Framework Preset: Other**, **Root Directory: ./**.
3. Deixe **Build Command** vazio e mantenha a saída padrão para o site estático.
4. Clique em **Deploy**. Depois, cada commit na `main` gera uma nova versão.

O site não exige instalação de dependências, compilação, back-end ou chaves secretas.

## Conteúdo e revisão

- **Identidade visual:** utiliza a logomarca original fornecida pelo cliente. O layout e a paleta de interface são uma proposta da UXDriven inspirada nas cores da marca, sujeita a aprovação.
- **Imagens:** fotografias de banco de imagens Unsplash, servidas por `images.unsplash.com`, usadas apenas para ilustrar segmentos e produtos. Não são trabalhos ou instalações da Disk Digital.
- **Produtos:** categorias apresentadas como possibilidades para orçamento, sujeitas à confirmação da empresa.
- **Dados públicos:** telefone, endereço, horários e avaliação do perfil Google consultados em novembro de 2026. Validar antes da publicação comercial.
- **Formulário:** os dados inseridos não são armazenados em servidor; uma mensagem pré-formatada é aberta no WhatsApp do número informado.
- **Operação:** aplicação estática ideal para provas de conceito. O Vercel Hobby tem restrições para uso comercial.

## Personalização

Telefone e links de contato aparecem no HTML e em `script.js`; altere ambos caso o número mude. O mapa aponta ao endereço confirmado. Textos, categorias, imagens e cores podem ser modificados sem reconfigurar a hospedagem.
