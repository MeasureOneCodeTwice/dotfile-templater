export function wrapError(e: unknown, messageWrap: string): Error {
    let message = "wrapError error has no message";
    if(e instanceof Error) {
        message = e.message; 
    }
    return Error(`${messageWrap}:\n${message}`);
}
