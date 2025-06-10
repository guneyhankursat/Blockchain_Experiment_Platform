  
const { PrivateKey, PublicKey, Hash,  Networks} = require('@bsv/sdk');
const bip39 = require('bip39'); // Import mnemonic library
const crypto = require('crypto');
const bs58check = require('bs58check'); // Ensure correct import

(async () => {
    try {
        // Generate a 12-word mnemonic (seed phrase)
        const mnemonic = bip39.generateMnemonic();
        console.log(`Mnemonic (Seed Phrase): ${mnemonic}`);

        // Convert mnemonic to a seed
        const seed = await bip39.mnemonicToSeed(mnemonic);

        // Generate a private key using the first 32 bytes of the seed
        const privateKeyHex = seed.slice(0, 32).toString('hex');
       // const privateKey = PrivateKey.fromHex(privateKeyHex);
       const privateKey = new PrivateKey(Networks.testnet); // Generate testnet key

        console.log(`Private Key (Hex): ${privateKey.toHex()}`);
        console.log(`Private Key (WIF): ${privateKey.toWif()}`);

        // Generate Public Key from Private Key
        const publicKey = privateKey.toPublicKey();
        console.log(`Public Key: ${publicKey.toString()}`);

        // Convert public key HEX string to a buffer
        const publicKeyBuffer = Buffer.from(publicKey.toString(), 'hex');

        // Derive Bitcoin SV address (P2PKH format)
        const pubKeyHash = Hash.ripemd160(Hash.sha256(publicKeyBuffer));
        const pubKeyHashBuffer = Buffer.from(pubKeyHash);

        // Base58Check encode to derive the final Bitcoin SV address
        const addressBuffer = Buffer.concat([Buffer.from([0x00]), pubKeyHashBuffer]); // 0x00 is Mainnet version

        // Force correct import if needed
        const encode = bs58check.default ? bs58check.default.encode : bs58check.encode;
        const bsvAddress = encode(addressBuffer); // Use correct function

        console.log(`BSV Address: ${bsvAddress}`);

    } catch (error) {
        console.error("Error generating key:", error);
    }
})();