# VZY Test API

## TODO

- [x] setup all the middleware
- [x] create schema
- [x] create all models
- [ ] create all endpoints
- [x] create feature that sends emails to users...
- [ ] add secondary features such as payments(stripe, paypal or flutterwave)
- [ ] test the code (with jest)
- [ ] versioning
- [ ] release

## For **dev**

Follow the flow in the env.example,

> note: the uri is a incorrect, put the real one for altas... with your username and password.

## Response data model guide (for the frontend guys)

> will be documented when the models are done
> pay close attention to the docs at postman

## Things to Note

### Response Object

> most likely looks like this!

```json
{
    "status": "success",
    "message": "Successully perform an action",
    "data": {...},
}
```
