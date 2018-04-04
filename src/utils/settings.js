let settings = {};

export function setSetting(key, value) {
    settings[key] = value;
}

export function getSetting(key) {
    return settings[key] === undefined ? null : settings[key];
}