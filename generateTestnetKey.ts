import { bsv } from 'scrypt-ts';

(() => {
    // Generate a random testnet private key
    const privateKey = bsv.PrivateKey.fromRandom('testnet');
    const publicKey = privateKey.publicKey;
    const address = bsv.Address.fromPublicKey(publicKey, 'testnet');
    const wif = privateKey.toWIF();

    console.log("✅ Testnet Key Generated:");
    console.log("🔑 Private Key (WIF):", wif);
    console.log("📬 Testnet Address:", address.toString());
})();
