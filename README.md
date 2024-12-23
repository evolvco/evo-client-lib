# EVO SDK
- simplifies tasks such as authentication and authorization

## install
- clone the lib in the parent folder of your project. from your project root run 

```
cd ../
git clone git@github.com:evolvco/evo-client-lib.git
```

- link this package to your project root by running the following from your project root.

```npm init -w ../evo-client-lib```

- run from your project root.

```npm i evo-client-lib```

## Authentication
- helpers include an AuthProvider and a useAuth hook
- [React Router Example](docs/react-router-auth.md)
- [Simple Example without React Router](docs/simple-auth.md)




RequireAuth({ children, onFailure=()=>{}, loader, loaderClass }) {

export function LoginForm({
    onSuccess,
    onFailure,
    formClass,
    errorClass,
    labelClass,
    inputClass,
    headerClass,
    footerClass,
    submitClass
}) {