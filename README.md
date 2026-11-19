# Rick and Morty App

Aplicativo em React Native (Expo) que consome a [Rick and Morty API](https://rickandmortyapi.com/documentation).
Atividade bimestral 2.

## Integrantes

- William Estevam
- Leonidas Caliel

## Telas

1. **Personagens**: lista com paginação infinita e busca por nome.
2. **Detalhes do personagem**: foto, status, espécie, origem, localização e os episódios em que aparece.
3. **Episódios**: lista paginada com código, nome, data de exibição e quantidade de personagens.
4. **Locais**: lista paginada com tipo, dimensão e quantidade de residentes.

## Tecnologias

- React Native com Expo
- Expo Router (abas e tela de detalhes)
- fetch para consumo da API

## Como rodar

```bash
npm install
npx expo start --clear
```

Abra no celular com o app Expo Go lendo o QR code, ou pressione `a` para o emulador Android.
Para abrir no navegador, pressione `w` ou rode `npm run web`.
