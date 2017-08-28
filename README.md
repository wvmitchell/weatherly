#### Weatherly Challenge

The purpose of this app is to provide the user with a weather forecast for their area, allowing them to enter a zipcode
or city. Additionally, if the user enters an incomplete entry, they're prompted with potential options.

## Necessaries

You should already have node installed before running this project, ideally node 7. If you're using nvm to manage your
node versions, you can switch with `nvm use 7`

## Getting started

clone the repository: `git clone git@github.com:wvmitchell/weatherly.git`
navigate into the repo: `cd weatherly`
install the dependencies: `npm i`
start the app: `npm run start`

## Running the tests

Two different options here:

`npm run test:watch` or `npm run test`

The former will rerun tests whenever you make any changes, very handy. The latter with run the linter before running the
test suite, and will then provide a coverage estimaate.


## About the design

This app is built on top of the react-boilerplate framework, and utilizes the following technologies

React
Redux
Redux Sagas

Note: The exact requirements for this project asked for using jquery, only for ajax purposes. Rather than doing this,
I've used the whatwg-fetch polyfill, which enables the HTML5 window.fetch standard.
