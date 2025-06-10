import { HashLock } from './src/contracts/HashLock';
import { bsv, DefaultProvider, TestWallet, sha256, toByteString, MethodCallOptions, UTXO } from 'scrypt-ts';

(async () => {
    // Step 1: Compile the contract to ensure artifacts are available
    await HashLock.compile();

    // Step 2: Set up the provider for Testnet
    const provider = new DefaultProvider({ network: bsv.Networks.testnet });

    // Step 3: Set the wallet
    const privateKeyWIF = 'cRwLnvU7HmVCBZfpnNM57Wwx4ro7qghW7JGt5wYFNKNCruGjcmUG';
    const privateKey = bsv.PrivateKey.fromWIF(privateKeyWIF);
    const signer = new TestWallet(privateKey, provider);

    // Step 4: Define the secret and calculate its hash
    const secret = '777';
    const hash = sha256(toByteString(secret, true));

    // Step 5: Fetch the transaction containing the contract UTXO
    const txid = '6c598adce23e656c0a18ac8bf833f538083ae4700c0df80a807cc71e8aab80de';
    const outputIndex = 0;

    const tx = await provider.getTransaction(txid);
    if (!tx) {
        throw new Error(`Transaction ${txid} not found.`);
    }

    const contractUtxo: UTXO = {
        txId: txid,
        outputIndex: outputIndex,
        script: tx.outputs[outputIndex].script.toHex(),
        satoshis: tx.outputs[outputIndex].satoshis,
    };

    const instanceFromUTXO = HashLock.fromUTXO(contractUtxo, hash);
    await instanceFromUTXO.connect(signer);

    const unlockTx = await instanceFromUTXO.methods.unlock(
        toByteString(secret, true),
        {
            changeAddress: privateKey.toAddress(),
        } as MethodCallOptions<HashLock>
    );

    console.log(`✅ Unlock transaction broadcasted! TX ID: ${unlockTx.tx.id}`);
})();
