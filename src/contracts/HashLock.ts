import { assert, ByteString, method, prop, sha256, SmartContract } from 'scrypt-ts';

export class HashLock extends SmartContract {
    @prop()
    readonly hash: ByteString;

    constructor(hash: ByteString) {
        super(...arguments);
        this.hash = hash;
    }

    // Method to retrieve the stored secret hash (for dynamic checking)
    @method()
    public getSecretHash(): ByteString {
        return this.hash;
    }

    @method()
    public unlock(secret: ByteString) {
        assert(sha256(secret) === this.hash, 'Invalid secret');
    }
}
