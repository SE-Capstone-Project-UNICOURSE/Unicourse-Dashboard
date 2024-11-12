import { VIMEOKEY } from '@app/common/constants/appConstants';
import CryptoJS from 'crypto-js';

class CryptoJSService {
    public encrypt(password: string): string {
        return CryptoJS.AES.encrypt(password, VIMEOKEY).toString();
    }

    public decrypt(passwordToDecrypt: string) {
        return CryptoJS.AES.decrypt(
            passwordToDecrypt,
            VIMEOKEY
        ).toString(CryptoJS.enc.Utf8);
    }
}

export default new CryptoJSService();
