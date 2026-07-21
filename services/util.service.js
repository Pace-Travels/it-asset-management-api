import toOriginal from 'await-to-js';
import pe from "parse-error";

export const to = async (promise) => {
    const [err, res] = await toOriginal(promise);
    if (err) return [pe(err), null];
    return [null, res];
}

export const ReE = (res, err, code = 422) => {
    let error = err;
    if (typeof err === "object") {
        error = err.message;
    }
    return res.status(code).json({
        success: false,
        error
    });
};

export const ReS = (res, data = {}, code = 200) => {
    return res.status(code).json({
        success: true,
        ...data
    });
};


export const TE = (err, log = false) => {
    if (log) console.error(err);
    throw new Error(err);
};