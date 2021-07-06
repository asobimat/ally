import { Exception } from '@poppinss/utils';
export declare class OauthException extends Exception {
    static missingAuthorizationCode(paramName: string): OauthException;
    /**
     * Unable to verify state after redirect
     */
    static stateMisMatch(): OauthException;
}
