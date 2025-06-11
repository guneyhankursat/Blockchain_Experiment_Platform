# Blockchain Experiment Platform 🎮📜

A full-stack DApp for simulating behavioural economics games (like the Ultimatum Game) on the Bitcoin SV blockchain. Built using sCrypt smart contracts and a lightweight Vue.js frontend. Developed as part of the MSc Financial Technology coursework at the University of Exeter.

---

## 🔗 Live Demo

Check out the deployed app here:  
👉 [Secret Guessing Game](https://guneyhankursat.github.io/Blockchain_Experiment_Platform/)


## 💡 Ultimatum Game Logic

> Player A proposes a split of a fixed pot (e.g., 1000 satoshis).  
> Player B accepts or rejects the offer.  
> - If accepted: both players receive the proposed amounts.  
> - If rejected: both players receive nothing.

This logic is enforced directly by an on-chain smart contract written in sCrypt and deployed to the BSV testnet or mainnet.

---

## ⚙️ Technologies Used

- **sCrypt** – Smart contract language for Bitcoin SV
- **Vue.js (via CDN)** – Minimalist frontend UI
- **Vite** – Frontend dev server and build tool
- **TypeScript + Node.js** – Deployment and test scripts
- **Bitcoin SV Testnet/Mainnet**
- **HTML/CSS/JS** – Frontend UI

---

## 📁 Project Structure

| File / Folder         | Description                               |
|-----------------------|-------------------------------------------|
| `src/contracts/`      | sCrypt smart contract source              |
| `artifacts/`          | Compiled contract artifacts               |
| `deploy.ts`           | Script to deploy the contract             |
| `redeem.ts`           | Redeems/executes game logic               |
| `generateTestnetKey.ts` | Generates a random testnet key          |
| `secret-game/`        | Frontend UI (Vue + Vite)                  |
| `docs/`               | GitHub Pages deployment (built frontend) |
| `tsconfig.json`       | TypeScript config                         |
| `scrypt.index.json`   | sCrypt artifact index                     |
| `package.json`        | Node.js dependencies                      |
| `README.md`           | You are here!                             |

---

## 🚀 How to Run Locally

### 🧩 1. Install dependencies

npm install

###  🔐 2. Generate a testnet key

npx ts-node generateTestnetKey.ts

###  Example output:

✅ Testnet Key Generated:  
🔑 Private Key (WIF): cRFyEzUNkf5rggAD5rUziPRXERd5ZLinRhovWvbNpqF8j87mh98q  
📬 Testnet Address: mnju7krB3QDYpaSntXfsxCPUonugw2zqkC  

###  📦 3. Deploy the smart contract

npx ts-node deploy.ts

### Example output:

Contract successfully deployed on MAINNET! TX ID: <txid>

### 🧮 4. Redeem (simulate offer acceptance/rejection)

npx ts-node redeem.ts

### 🌐 Frontend Interface (secret-game/)

### 1. Start development server

cd secret-game  
npm install  
npm run dev  

### Example output:  

Then open http://localhost:5173 in your browser.


