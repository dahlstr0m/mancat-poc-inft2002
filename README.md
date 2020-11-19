<p align="center">
  <h3 align="center">inft2002-gr4-portfolio</h3>

  <p align="center">
    Simple portfolio app made for Mancat design.
  </p>
</p>

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://gitlab.stud.idi.ntnu.no/hpbastia/inft2002-gr4-portfolio.git
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
