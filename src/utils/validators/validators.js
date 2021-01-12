export const required = value => (value ? undefined : 'Required');

export const maxLength = max => (value) => (value && value.length > max ? `Max length is ${max} symbols ` : undefined);

export const fileType = type => (value) => {
    if (value) {
        for (let i = 0; i < value.length; i++) {
            let file = value[i];
            let fileType = file.type.match(type)
            if (!fileType) return `invalid ${type} file type`;
        }
    }
    return undefined
}



export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)
