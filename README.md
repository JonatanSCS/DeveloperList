# DeveloperList
A Developer List using React and Loopback

## Prerequisites

In order to run this project the following O.S packages must be installed and their corresponding commands should be available.

- node.js >= 7.5.0
- npm >= 4.1.2
- yarn >= 0.24.6
- loopback

## Install :floppy_disk:

*For DEV is important create a `.env` file and add `NODE_PATH='src/'` in root directory*

1. clone repository && cd to cloned folder.
2. install dependencies: `yarn install`
3. run development server `yarn start` :: this will open a browser window.
4. `cd` to `developer_api`
5. `node .` to run server
By default development server runs on **PORT 3000**, to change the running PORT you need to specify the port with the following command: `PORT=3000 yarn start`



### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that your app loads from local cache on future visits.

The app is ready to be deployed.
