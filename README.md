# EVO SDK
- simplifies tasks such as authentication and authorization

## Requirements
- A server somewhere running Evo Server `git@github.com:evolvco/evo-server.git`
- Either a proxy directing all traffic from your client going to `/api` and `/ws` to the Evo Server, or setting the domain of the lib using `setRestDomain`, and `setSocketDomain`
- [Proxy example using vite proxy](docs/proxy.md)
- [Set Domains example](docs/set-domains.md)

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


### Components

#### RequireAuth
| Parameter     | Type              | Example   | Options   |
| ---------     | -----------       | --------  | -------   |
| children      | React.Children    |           |           |
| onFailure     | function          | (e)=>{}   |           |
| loader        | React.Node        |           |           |
| loaderClass   | String            |           |           |

#### LoginForm
| Parameter     | Type              | Example   | Options   |
| ---------     | -----------       | --------  | -------   |
| onSuccess     | function          | ()=>{}   |           |
| onFailure     | function          | (e)=>{}   |           |
| formClass   | String            |           |           |
| errorClass   | String            |           |           |
| labelClass   | String            |           |           |
| inputClass   | String            |           |           |
| headerClass   | String            |           |           |
| footerClass   | String            |           |           |
| submitClass   | String            |           |           |
