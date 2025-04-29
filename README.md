# 🚀 Ethereum Blockchain Integration with MetaMask

This project integrates **MetaMask** to fetch balances, send transactions, and interact with the Ethereum blockchain using a Node.js/NestJS backend.

## ✨ Features

- 🔍 Fetch the ETH balance of a wallet address

- 💸 Send Ethereum transactions via **MetaMask**

- 📦 Retrieve block and transaction details from the Ethereum network

---
## 📦 Prerequisites

- NodeJS version `>=20.0.0` — recommended to use [NVM](https://github.com/nvm-sh/nvm)
- Linux-based terminals are preferred: `bash`, `shell`, or `git bash`
- In **VSCode**, install the following extensions:
  - `ESLint`
  - `Prettier`
  - `Nx Console`

## ⚙️ Environment Variables

### 🌐 General Configuration

| Variable           | Description                                      |
| ------------------ | ------------------------------------------------ |
| APP_PORT           | Port where the server will run (default: 3000)   |
| APP_ENV            | Application environment (e.g., dev, prod)        |
| JWT_REFRESH_SECRET | Secret key for signing JWT tokens                |
| ETH_RPC_URL        | Ethereum network RPC URL (e.g., Infura endpoint) |

### 🛠️ Database Configuration

| Variable            | Description                                | Example           |
| ------------------- | ------------------------------------------ | ----------------- |
| TYPEORM_DATABASE    | Name of the database                       | my_database       |
| TYPEORM_USERNAME    | Database username                          | admin             |
| TYPEORM_PASSWORD    | Database password                          | securepassword123 |
| TYPEORM_HOST_HOST   | Host where the database runs               | localhost / db    |
| TYPEORM_SYNCHRONIZE | Enables auto-sync of DB schema with models | true              |
| TYPEORM_LOGGING     | Enables or disables TypeORM query logging  | true              |

## 🚀 Getting Started

### Install/Add Dependencies

From the root directory:

```
yarn install
```

**Build the Application**

```
yarn nx run server:build
```

**Run in Development Mode**

```
yarn nx run server:dev
```

**Run migrations (if required)**

```bash

npm run migration:run
```

## 📌 Core API Endpoints

### 🔐 Auth

- **Login**
    `POST /auth/login`
---

### 💰 Ethereum Wallet

- **Get Balance**
    `GET /ethereum/balance?address=<WALLET_ADDRESS>`
---

### 🔁 Send Transaction

- **Endpoint**
    `POST /ethereum/transaction`

- **Request Body Example**

```JSON
{
  "from": "0x5976c0f3a654b1A9224f2454A80b65B2CC447fD1",
  "to": "0x5976c0f3a654b1A9224f2454A80b65B2CC447fD1",
  "value": 20
}
```

### ⛓️ Get Block Details

- **Endpoint**
    `POST /ethereum/block`

- **Request Body Example**
```JSON
{
  "blockNumber": 100
}
```