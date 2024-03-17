
const project = 'weland';
export function getCurrentAddress() {
    return localStorage.getItem(`${project}CurrentAddress`) || '';
}

export function setCurrentAddress(address:string) {
    return localStorage.setItem(`${project}CurrentAddress`, address);
}

export function getLoginResult(address:string) {
    return localStorage.getItem(`${project}LoginResult${address}`) || '{}';
}

export function setLoginResult(value:string, address:string) {
    return localStorage.setItem(`${project}LoginResult${address}`, value);
}

export function removeAllLoginResult() {
    Object.entries(localStorage).map(
      x => x[0]).filter(
      x => x.startsWith(`${project}LoginResult`)
    ).map(
      x => localStorage.removeItem(x)
)
}
export function getCurrentAccessToken(address:string) {
    address=address||"";
    const loginResult = JSON.parse(getLoginResult(address.toLocaleLowerCase()));
    return loginResult.accessToken;
}