# middleware-in-the-middle

Node middleware for enforcing mutual TLS.

## TLS configuration

TLS requires 3 files in the root of the project:

- `{MODE}.key`: private key for the server
- `{MODE}.crt`: certificate for the server; should contain any intermediaries / the rest of the chain
- `ca.crt`: root certificate for the CA issuing the mTLS certificates

`MODE` currently takes one of the values of `idp` or `broker` depending on the `MODE` environment variable.
This is configured in [state.js](/logic/state.js).

## Generation of the express app

Express app generated from:

```
npx express-generator -v ejs -c sass -e --git
```

In particular, this uses:

- EJS as a view engine
- SASS for stylesheets
