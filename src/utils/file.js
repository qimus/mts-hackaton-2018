import md5 from 'md5'

export function getFileId(file) {
    if (file.id) {
        return file.id;
    } else if (file.preview) {
        return file.preview.split(/\//).slice(-1)[0];
    } else {
        return file.name;
    }
}

export function generateUniqId(file) {
    return md5(file.name + (new Date()).getTime());
}