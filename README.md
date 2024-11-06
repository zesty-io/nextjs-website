<div align="center">

<img src="https://brand.zesty.io/zesty-io-logo.svg" width="150">
<h1>
aa
Zesty.io NextJS Marketing Website
</h1>
<i>

Marketing Website using NextJS and Zesty.io Headless CMS

</i>

<a href="https://github.com/zesty-io/website/stargazers"><img src="https://img.shields.io/github/stars/zesty-io/website?style=flat-square&&color=F4CE01" alt="Stars Badge"/></a>
<a href="https://github.com/zesty-io/website/pulls"><img src="https://img.shields.io/github/issues-pr/zesty-io/website?style=flat-square&&color=4DC71F" alt="Pull Requests Badge"/></a>
<a href="https://github.com/zesty-io/website/issues"><img src="https://img.shields.io/github/issues/zesty-io/website?style=flat-square&&color=F88304" alt="Issues Badge"/></a>
<a href="https://github.com/zesty-io/website/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/zesty-io/website?color=9B1FE9&&style=flat-square"></a>
<a href="https://github.com/zesty-io/website/blob/master/LICENSE"><img src="https://img.shields.io/github/package-json/dependency-version/zesty-io/website/react?style=flat-square&&color=5ED3F3" alt="License Badge"/></a>
<a href="https://github.com/zesty-io/website/blob/master/LICENSE"><img src="https://img.shields.io/github/package-json/dependency-version/zesty-io/website/next?style=flat-square" alt="License Badge"/></a>

<a href="https://github.com/zesty-io/website/blob/master/LICENSE"><img src="https://img.shields.io/badge/MUI-%230081CB.svg?style=flat-square&logo=mui&logoColor=white" alt="License Badge"/></a>

</div>

## ⚡ Getting Started

Requires `node version ^18.x.x` and `npm version ^8.x.x`

Create a file at the root `.env.local` with `PRODUCTION=false` as the file contents

```bash
git clone git@github.com:zesty-io/website.git

cd website

npm install

npm run dev

## open browser to http://localhost:3000/

```

## 💡 Syncing Zesty.io Content Models to Next JS

From the command line at the root of the project run:

```jsx
node scripts/zesty-nextjs.js
```

This will create new files where needed, but will not overwrite existing files.

## 💡 AutoDeploy Overview

### Branch Deployment Behavior:

- **`dev` Branch:** Use for testing purposes; feel free to modify as needed.
- **`stage` Branch:** Review and thoroughly test changes before moving to `pre-prod (beta)`.
- **`accounts` Branch (pre-production, beta):** Configuration mirrors `production`.
- **`production` Branch:** Merge from `accounts` after confirming stage readiness.

### Preview Links:

- **`dev`:** [Zesty.dev](https://zesty-dev-website-m3rbwjxm5q-uc.a.run.app/)
- **`stage`:** [WebEngine Stage](https://kfg6bckb-dev.webengine.zesty.io) OR [Zesty Stage](https://zesty-website-m3rbwjxm5q-uc.a.run.app/)
- **`accounts` (beta):** [Beta Zesty.io](https://beta.zesty.io)
- **`production`:** [Zesty.io](https://www.zesty.io) OR [Zesty Production](https://zesty-website-production-m3rbwjxm5q-uc.a.run.app/)

This setup automates deployment upon any push or merge to `dev`, `stage`, or `production` branches. Each branch serves a specific purpose, with accessible preview links for respective environments.

## 💡 Contribution Process

1. **Create a Branch:** Start by creating a new branch for your changes.
2. **Make Local Changes:** Edit and commit your changes locally.
3. **Test Changes:** Verify your changes locally using `npm run build`.
4. **Create Pull Request:** If the local build succeeds, create a pull request targeting the `stage` branch (our staging environment).

## 💡 Deployment to Production Workflow

After successfully deploying changes to the `stage` branch, follow these steps:

1. **Create PR to `production`:** Initiate a pull request from `stage` to `production`.
2. **Merge to Trigger Production Build:** Upon merging the pull request, an automatic production build will be triggered.

This workflow ensures that changes are thoroughly tested in the staging environment (`stage` branch) before being merged into the production environment (`production` branch). It maintains a structured process for contributing changes and deploying them to production.

## 💡 CTA Components and Forms

Please use these core CTA components through your views. These forms already have validation setup and connect to our remote services.

### 💡 Try Button

A button that trigger a dropdown guiding both a developer and marketers option

`<TryFreeButton>` [View Try Free Button Component](src/components/cta/TryFreeButton.js)

### Standard Form

A Form that posts to our CRM and has many option to controls inputs

`<StandardFormWithSelect>` [View Standard Form Component](src/components/cta/StandardFormWithSelect.js)

### Subscribe Form

A simple form that asks for user email

`<SubscribeCTA>` [View Subscribe Component](src/components/cta/SubscribeCTA.js)

### Developer Codeblock Starter

A one-line code block that shows developer how to start from the command line

`<CodeBlock>` [View Code Block Component](src/components/cta/CodeBlock.js)

## Lead Capture

All lead capture funnels from the above components into one of two cloud functions which connect to ZOHO CRM.

1. Marketing Subscribe: [GCP Link](https://console.cloud.google.com/functions/details/us-central1/zohoEmailSubscribe?env=gen1&project=zesty-dev) [Github Link](https://github.com/zesty-io/gcp-cf/blob/940b2d71144feb66dffe3b405137c334c595f869/zoho/index.js#L65) [Trigger](https://us-central1-zesty-dev.cloudfunctions.net/zohoEmailSubscribe) Both Gisele and Randy have access to deploy this.
2. Lead Capture: [GCP Link](https://console.cloud.google.com/functions/details/us-central1/zoho?env=gen1&project=zesty-prod) [Github Link](https://github.com/zesty-io/gcp-cf/blob/master/zoho/index.js) [Trigger](https://us-central1-zesty-prod.cloudfunctions.net/zoho) Only Randy or the egneinerr team has access to deploy this.

## Marketing URL Parameters

Marketers may collect campaign data through the website by using `UTM` values as outlined [in this document](https://support.google.com/analytics/answer/1033863?hl=en#zippy=%2Cin-this-article)

**URL Query Parameter Options**

Append to the end of a URL after a `?` like `?utm_campaign=promocodeX`

- `utm_campaign` (explicit name of the campaign e.g. NextJSWordpress, promocodeX)
- `utm_medium` (e.g. cpc, banner, email newsletter)
- `utm_source` (e.g. google, newsletter17, billboard)
- `utm_term` (keywords used in paid search)
- `persona` (e.g. Developer, Marketer)

**Usage**

Not parameters must be all lowercase, one or more or none can be used. `persona` will always default to "marketer"

- https://www.zesty.io/?utm_campaign=NextJSWordpress&persona=developer&utm_source=nextjswebsite&utm_medium=paid%20advertising
- https://www.zesty.io/?utm_campaign=NextJSWordpress&persona=developer&utm_source=adwords&utm_medium=ppc&utm_term=nextjs
- https://www.zesty.io/?persona=developer
- https://www.zesty.io/?utm_term=jquery&persona=developer

## Material Icons

### Using Icons in the WYSIWYG

The icons set we use is Google Material Icons https://fonts.google.com/icons

To use the icons in a WHYSIWYG editor, type in plain text `ICON_icon_name` e.g `ICON_check` use the link to the icons font aboe to learn icon names.

### Using icons in React

**For static icons main in the design**

```jsx
import LoginIcon from '@mui/icons-material/Login';

<LoginIcon>
```

Replace Login with the icon name.

**For dynamic icons that come from the content editor**

```jsx
import Icon from '@mui/material/Icon';

<Icon>{icon_name}</Icon>;
```

**For SEO renaming of component**

```jsx
variant = 'h4'; // Inherit Styles component = 'h2'; // DOM Element
```

# Production VS Stage Logic

The `content` object has access to `content.zestyProductionMode`, a boolean value, true for prod, false for stage/dev.

## Examples

### Determining our bases domain for fetch

```jsx
let zestyURL = content.zestyProductionMode
  ? process.env.zesty.production
  : process.env.zesty.stage;
```

### Using our zesty custom useFetch command

```jsx
const { data: latestArticles, isPending: latestPending } = useFetch(
  '/-/all-articles-hydrated.json?limit=5',
  content.zestyProductionMode,
);
```

### Making template level decision (to show things like GTM or scripts)

```jsx
{
  props.content.zestyProduction !== false && (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MSPH3C8');`,
      }}
    />
  );
}
```

# Working with Content from Zesty

## Defaulting missing to content

See this example for loading dyanmic content and not breaking
https://github.com/zesty-io/nextjs-website/blob/869acdd08836c74fd9f6a602eddd01a9073dcc11/src/views/zesty/About.js#L51

# Using theme colors for custom styles

## Example usage

```jsx
import { useTheme } from '@mui/material';

const App = () => {
  const theme = useTheme();

  return <div style={{ color: theme.palette.primary.main }}>Hello World</div>;
};
```

using Styled Components or Emotion js

```jsx
import styled from '@emotion/styled';
import { useTheme } from '@mui/material';

const CustomButton = styled.button`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.theme.palette.primary.main};
  border: 1px solid ${(props) => props.theme.palette.zesty.zestyOrange};
`;

const App = () => {
  const theme = useTheme();

  return <CustomButton theme={theme}>Hello World</CustomButton>;
};
```

For more details you can browse to `src/theme` directory for complete list of themes.

```
│       └── PhoneSkeleton.js
├── theme
│   ├── index.js
│   ├── palette.js
│   └── shadows.js
├── utils
│   ├── index.js

```

# Marketplace

To auto set the instance zuid, you can pass the query param `?instanceZUID=8-xyz-xyz` to any page in the zesty.io website. This will auto set `ZESTY_WORKING_INSTANCE` and overwrite.

_Available cookies_

- ZESTY_WORKING_INSTANCE - instance zuid for checking support, marketplace, docs, etc.
- APP_SID - auth token

# Github Data Fetching For Roadmap

## Requirements

Must create `.env` file and add `GITHUB_AUTH`

```
GITHUB_AUTH="Personal Auth Token"
```

Github `Personal Auth Token` can be generated from https://github.com/settings/tokens

- Make sure to set token to no expiration
- Set Token scope to `public_repo` `read:org` `read:discussion`

### Settings

settings can be found on `pages/[...slug]`

```jsx
const settings = {
  organization: `"Zesty-io"`,
  projectNumber: data.project_number,
  columns: data.max_column,
  cards: data.max_card,
  discussions: data.max_discussion,
};
```

- `organization`: Organization where the data should be pulled
- `ProjectNumber`: Github Project ID
- `columns`: Number of columns that can be shown to the page
- `cards`: Number of cards that can be shown to the columns
- `discussion`: Number of discussion can be shown to the discussion columns

These data can be updated or set from the CMS `roadmap` model

# Updating Email Signature

To update the image and link of the email signature:

1. Update the image in this repository located at [public/assets/images/email-banner.png](https://github.com/zesty-io/nextjs-website/blob/main/public/assets/images/email-banner.png) and push that through main (stage) and production branches
2. Update the link in zesty manager under globals https://8-aaeffee09b-7w6v22.manager.zesty.io/content/6-984410-xnfd99/7-d60cd0-64nw39 there is a field named `Email Announcement URL link: email_announcement_url` save and publish the change

How it works is the image in the signature is pointed to a static image url reference which on zesty.io next site, which is https://www.zesty.io/assets/images/email-banner.png and the URL in the points to a custom parsley file that setups up a 301 redirect to the link edited in globals, this is the file https://8-aaeffee09b-7w6v22.manager.zesty.io/code/file/views/11-f49eb1abdb-h0nt9b https://www.zesty.io/email/annoucement-link.html

# State Management

We use [Zustand](https://github.com/pmndrs/zustand) as state management. We wrap this in [/src/store/index.js](/src/store/index.js) in function called `useZestyStore`. This is accessed by importing to the component, here is the example of the import:

```jsx
import { useZestyStore } from 'store';
```

Currently, we store constants that allow us to engage in API and make decisions in the interface based upon user status. This includes user Auth state and user preferences.

- `isUser`(boolean) checks if the visitor is the zesty user
- `isAuthenticated` (boolean) check if the user has an active verified session
- `ZestyAPI`(Object) is a global window object

## Example of how we access the `isUser` in store

```jsx
// isUser use to determined if the visitor is zesty user

import { useZestyStore } from 'store';

// this is how isUser is set
  setisUser: (data) => set((state) => ({ isUser: data })),
// how isUser is access
   const {  isUser } = useZestyStore((state) => state);
```

## Using the ZestyAPI, a global Object that instantiates fetchwrapper

[ZestyAPI](https://github.com/zesty-io/fetch-wrapper) is global and can be accessed through global state management, here is the example :

```jsx
import { useZestyStore } from 'store';

const ZestyAPI = useZestyStore((state) => state.ZestyAPI);

console.log(ZestyAPI.verify(token));
```

ZestyAPI has two modes (development and production) which can be access using the .env file

Example for dev

```jsx
PRODUCTION = false;
```

# Working in this repo

## Folder and file structure

- Components should live in their specifics application folders
- Shared or common component should live in the blocks folders
- All images should be uploaded to the CDN with the exception of `image-banner.png`. SVG's may be committed to the repository, but it's suggested to upload them into CDN

## Branch Deployment Flow

- Any merge to `main` will auto deploy to stage (webengine)
- Any merge to `production` will deploy to `production` (zesty.io)
- Only the `main` branch when approved should be merge to `production`

### Tests

Tests are located `test`, tests use the jest package. Tests are run like

```
npm run test
```

[Jest](https://github.com/facebook/jest) is recommended testing tool for unit / integration testing by facebook , support async out of the box , has snapshot testing / coverage report , detect file with `*.test.js`/ `*.spec.js` and great community. Jest is implemented by installing the npm packages jest and react testing library then Jest has two file configuration which are `jest.config.js` and `jest.setup.js`. To begin testing with jest just run `npm run test` and it will find all files inside this directory that has filename matching this `*.test.js`/ `*.spec.js` and it will start the tests and after each test it will provide a summary in the console log whether the test is passed or failed.

## Auto Deployment

- Build time takes about 5 minutes
- Auto deployment run through cloud run and cloud build integration with github
- This occurs in the zesty-dev google cloud project

# Component Error Handling

Given that our website receives data from a Zesty CMS, the marketing team or developer may occasionally attempt to make changes and might unintentionally delete content. This will fail reaching the specific object data from the CMS and the TypeError is born.

##### Server Error

`TypeError: Cannot read property 'title' of undefined`

Let’s take a look of ways how can we avoid a webpage from crashing in production?

### Ternary Operator Checks + Fallback Content

A best practice when attempting to retrieve object data from Zesty CMS is to carry out tests before to rendering the data and add fallback content in the event that the data is undefined or missing from Zesty CMS.

##### Example

`content.title ? content.title : 'fallback title';`

Here, we're attempting to determine whether the `content.title` object is empty; if it is, "fallback title" will be displayed on the screen.

Another way of writing the above statement is to use logical OR operator

`content.title || 'fallback title';`

### Test against production environment

Zesty CMS gives you the option to work on `stage` and `production` endpoints when you are developing locally. You may switch between the two endpoints by changing your local env file.

##### Example Env

`Production=true` - Only returns data from the production endpoint that have been published by the zesty CMS

`Production=false` - only receives data that is saved or in a draft state but has not yet been published when using the staging endpoint

Most of the time when developing a website, you will use the staging endpoint and consume data that has not yet been published or in draft state. This will allow you to test the general functionality of the website using the CMS data without breaking the live or production site.

However, switching the env variable from staging to production is another excellent way to guarantee that your website won't break when you publish it to production. This will give you the ability to test the website using the production data, and if everything works perfectly, you're good to send your site to live.

# Accounts

Accounts is instances, profile, teams, dashboard. To working on the accounts apps locally, follow these steps.

1. You need to edit your ETC hosts files to use a domain like `test.zesty.io` to avoid CORS errors. To access your `localhost` see this thread for windows users https://github.com/zesty-io/manager-ui/discussions/1240
2. Run `npm run dev` check your `test.zesty.io` domain, if that resolves to your next.js page, great, if not, googlefu
3. Log into accounts.dev.zesty.io, refresh your localhost or test.zesty.io site

# End to end test using Cypress

Cypress test files are located in `root/cypress/integration/*.spec.js`

## Running Cypress Tests

Create `cypress.json` in root directory with the ff config

<details>
<summary>
sample cypress config
</summary>

```jsx

{
  {
  "defaultCommandTimeout": 20000,
  "video": false,
  "env": {
    "user": {
      "email": "your_email@zesty.io",
      "password": "your_password"
    },
    "cypress-plugin-snapshots": {
      "autoCleanUp": false,
      "autopassNewSnapshots": true,
      "diffLines": 3,
      "excludeFields": [],
      "ignoreExtraArrayItems": false,
      "ignoreExtraFields": false,
      "normalizeJson": true,
      "prettier": true,
      "imageConfig": {
        "createDiffImage": true,
        "resizeDevicePixelRatio": true,
        "threshold": 0.01,
        "thresholdType": "percent"
      },
      "screenshotConfig": {
        "blackout": [],
        "capture": "fullPage",
        "clip": null,
        "disableTimersAndAnimations": true,
        "log": false,
        "scale": false,
        "timeout": 30000
      },
      "serverEnabled": true,
      "serverHost": "localhost",
      "serverPort": 2121,
      "updateSnapshots": false,
      "backgroundBlend": "difference"
    }
  },
  "ignoreTestFiles": ["**/__snapshots__/*", "**/__image_snapshots__/*"],
  "viewportWidth": 1280,
  "viewportHeight": 720
}
}

```

</details>

### Headlessly

`npm run test:e2e:ci`

### Visually

`npm run dev` in 1st terminal and `npm run cy:open` in 2nd terminal then click the test you want to run.

## Uploading Assets

To upload assets for your projects put them on the CDN, do not put them in the repository. Assets can be uploaded at https://console.cloud.google.com/storage/browser/assets.zesty.io?project=zesty-prod , upload to the respective folder that match your project name, for example, the SVGs and PNG that are being commited to website should be moved into this storage bucket under the website folder, once they are uploaded they accessible from https://assets.zesty.io e.g. https://assets.zesty.io/website/assets/images/dxp_bottom_bg.svg

## Adding Data to Algolia Search

- open `algolia.js` file in `src/pages/api/algolia.js`
- specify the `data` and `index`
- pass it in `algoliaFunc`
- run the app `npm run dev`
- perform a `GET` request in this url `http://localhost:3000/api/algolia`
