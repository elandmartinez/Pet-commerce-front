This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## using java server app

login credentials must be "username" and "password"
url in auth route for login:`${BASE_ENDPOINT}/login` 


## using node.js app

login credentials must be "email" and "password"
url in auth route for login:`${BASE_ENDPOINT}/auth/login`
x

## email and password for login in

email: eland@gmail.com
password: admin123


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## About routing throug files organization

the folders inmediatly below the folde "app" are pages, the render when putted in the url  just as they appear on the files, for exmple the login folder is rendered when the url is "/login"

the "components" folder is not a page, just an internal folder, not represented through the url of the website.

for a folder below the app directory to be represented as a page throught the url it must have a file child named "page" and that file will be the component rendered. 