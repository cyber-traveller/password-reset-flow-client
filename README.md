# Password Reset Flow: Client

React front end for a complete authentication and password-reset flow: sign up, sign in, "forgot password" and a reset page reached from an emailed link. Pairs with [password-reset-flow-server](https://github.com/cyber-traveller/password-reset-flow-server).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=white)

## Pages

| Path | Page |
| --- | --- |
| `/signup` | Create an account |
| `/signin` | Sign in |
| `/forgot-password` | Request a reset link |
| `/reset-password` | Set a new password |
| `/home` | Signed-in home |

Forms use Formik with Yup validation, Material UI for the interface, Axios for requests and React Toastify for feedback.

## Getting started

```bash
git clone https://github.com/cyber-traveller/password-reset-flow-client.git
cd password-reset-flow-client
npm install
```

Create a `.env` file pointing at the server:

```
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | Run ESLint |
