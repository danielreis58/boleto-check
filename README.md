# Boleto check

This is a serverless API (Lambda function) for boleto validate.
A detailed specification is available in file `swagger.yml`. It can be opened online with [Swagger Editor](https://editor.swagger.io/).

### PRODUCTION

#### End-points:

Boleto (any length)

`https://9ughgxcbd0.execute-api.us-east-1.amazonaws.com/boleto/{boletoDigits}`

Boleto convênio (length 48)

`https://9ughgxcbd0.execute-api.us-east-1.amazonaws.com/boleto-convenio/{boletoDigits}`

Boleto título (length 47)

`https://9ughgxcbd0.execute-api.us-east-1.amazonaws.com/boleto-titulo/{boletoDigits}`

### LOCAL

#### 1. Install packages

```sh
npm install
```

#### 2. Run offline

```sh
npx serverless offline
```
