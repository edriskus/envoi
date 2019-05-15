# Envoi.ts

/ahn-vwa/

A distributed computing platform utilizing web browser context as the main computing resource.

## Develop

- **Prerequisites**:
  - MongoDB
  - NodeJS 10+
  - Yarn
- **API Workflow**
  1. `cd envoi-api`
  2. Create `.env` file with `JWT_SECRET=...` and `MAILGUN_API_KEY=...`
  3. `yarn`
  4. `yarn watch` watches for changes and bundles TypeScript
  5. (in another terminal) `yarn start` serves the API part
- **FE Workflow**
  1. `cd envoi-client`
  2. `yarn`
  3. `yarn start` watches FE for changes and deploys on `localhost:3000`

## Deploy

- **Prerequisites**:
  - MongoDB
  - NodeJS 10+
  - Yarn
  - [Serve](https://www.npmjs.com/package/serve)
- **API Workflow**
  1. `cd envoi-api`
  2. Create `.env` file with `JWT_SECRET=...` and `MAILGUN_API_KEY=...`
  3. `yarn`
  4. `yarn build`
  5. `yarn start` serves the API part.
- **FE Workflow**
  1. `cd envoi-client`
  2. `yarn`
  3. `yarn build`
  4. `serve -s build` serves the FE part