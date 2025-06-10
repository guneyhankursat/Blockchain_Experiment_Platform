import { HashLock } from './src/contracts/HashLock';
import { bsv, DefaultProvider, TestWallet, toByteString, sha256 } from 'scrypt-ts';

(async () => {
    // Step 1: Compile the contract (if not already compiled)
    await HashLock.compile();

    // Step 2: Set up the hash lock with the secret “777"
    const secret = '777';
    const hash = sha256(toByteString(secret, true));

    // Step 3: Create an instance of the contract with the hash
    const instance = new HashLock(hash);

    // Step 4: Manually set the wallet to use MAINNET

    const privateKeyWIF = 'cV8hY7n6gZ8rHhyNFkkvRRjnM37hHhYgdYKwcU1GLSnPRSpbvgTp'; // Replace with your actual mainnet private key
    const privateKey = bsv.PrivateKey.fromWIF(privateKeyWIF);

    // Step 5: Set up the provider for Mainnet
    const provider = new DefaultProvider({ network: bsv.Networks.testnet });





    // Step 6: Use `TestWallet` as the signer (extends `Signer`)
    const signer = new TestWallet(privateKey, provider); //Correct way to create a signer

    // Step 7: Connect the contract instance to the signer
    await instance.connect(signer);

    // Step 8: Deploy the contract with funds
    const deployTx = await instance.deploy(1000); // 1000 satoshis

    console.log(`Contract successfully deployed on MAINNET! TX ID: ${deployTx.id}`);
})();
