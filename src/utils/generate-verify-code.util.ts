export const generateVerifyCode = (length: number) => {
    let code = '';
    for (let i = 0; i < length; i++) {
        const c = Math.floor(Math.random() * 9);
        code += c;
    }
    return code;
};
