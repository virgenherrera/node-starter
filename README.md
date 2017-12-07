# node-starter
initial scaffold for a back-end with node js, express and typescript

## Project Setup
These dependencies must be installed globally as the initial step to configure the project environment.
- yarn
- typescript
- nodemon
- forever

### Step 1:
`npm i -g yarn@1.2.1 typescript@2.6.1 forever@0.15.3`

### Step 2:
The rest of the dependencies of this project and the initial pre-configuration will be installed running the command:
`yarn install`

### Step 3:
Provide the initial config files by typing in shell the `yarn provision` command

### Step 4:
update this project with your own Environment variables in the following files:
- `.env` (Service Config)

### Step 5 (optional):
You can customize the production options by updating the **./forever.json** file with your own settings

### `yarn` Commands
- `yarn start` Compile and Launch the service using the _"nodemon"_ module.
- `yarn develop` Compile in watcher mode and Launch the service with debug availability using the _"nodemon"_ module.
- `yarn production` Compile and Launch the service using the _"forever"_ module.
- `yarn provision` provides _.env_ and _forever.json_ ./persistance/_config.js_ files
- `yarn sequelize` Use Locally sequelize-cli package.
