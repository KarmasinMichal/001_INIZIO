# Poznámky z konfigurace a instalace pro testování

### Pro potřebu Jest testů jsem instaloval Jest a jest - fetch - mock pro testování fetch API. 

```
npm install --save-dev jest
```
### Používám moduly, tak testy spouštím s konfigurací v package.json

```
"scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
  }
```

### Pro potřebu testování fetch instaluji
```
npm install --save-dev jest-fetch-mock
```

### Build docker spustím pomocí
```
docker compose up --build
```