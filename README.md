# Portfolio [inft2002](https://www.ntnu.no/studier/emner/INFT2002)

Simple portfolio app made as a Proof of Concept for [Mancat design](https://www.instagram.com/mancatdesign/) fall 2020.
A new project will during fall 2021 be developed with some crucial changes that has been identified. Some of the changes is to utilize an open-source CRM, dockerize the webapp and add a beautiful front-end design.



- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running of this PoC follow these steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/dahlstr0m/mancat-poc-inft2002.git
```

2. Install and compile client

```sh
cd client
npm install
npm start
```

3. (Optional) Set up own MySQL connection

MySQL credentials are already set up to connect to DB with testing data.

Switch MySQL credentials in `server/src/config.js` and `server/test/config.js`. DB create scripts
are in `database-scripts/CreateTables.sql`

4. Install and start server

```sh
cd server
npm install
npm start
```

5. Testing

```sh
cd client
npm test

cd server
npm test
```

<!-- USAGE EXAMPLES -->

## Usage

Admin credentials:

```
username: admin
password: admin
```
