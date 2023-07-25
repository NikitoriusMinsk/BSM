export default interface AuthServerError {
    time: string,
    exception: string,
    message: string,
    errorCode: number,
    showPopUpInUI: boolean,
    applicationName: string
}