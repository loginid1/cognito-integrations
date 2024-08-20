import { LoginIDCognitoWebSDK } from "@loginid/cognito-web-sdk";


const cognitoPoolId = process.env.REACT_APP_COGNITO_POOL_ID || "";
const cognitoClientId = process.env.REACT_APP_COGNITO_CLIENT_ID || "";
const loginidBaseUrl = process.env.REACT_APP_LOGINID_BASE_URL || "";

export class LoginidService {
    static client = new LoginIDCognitoWebSDK(cognitoPoolId, cognitoClientId, loginidBaseUrl);
    static AUTH_FLOW_FALLBACK = "password";
}