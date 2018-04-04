/**
 * Фильтрация значений в объекте
 *
 * @param {Object} source
 * @param {Function|undefined} cb
 * @param {Boolean} recursive
 * @returns {{}}
 */
export function filterObject(source, cb = null, recursive = false) {
    let target = {}, key, item;

    for (key of Object.getOwnPropertyNames(source)) {
        item = source[key];
        if (recursive && item && Object.prototype.toString.call(item) === '[object Object]') {
            item = filterObject(item, cb, recursive);
        }
        if (typeof cb === 'function' && cb(item, key, source)) {
            target[key] = item;
        } else if (typeof cb !== 'function' && item !== undefined) {
            target[key] = item;
        }
    }

    return target;
}

/**
 * Поиск объектов в коллеции объектов, найденные объекты удаляются из коллекции
 * @param items
 * @param cb
 * @returns {Array}
 */
export function pull(items, cb) {
    let result = [];
    items.forEach((item, i) => {
        if (cb(item, i)) {
            result.push(item);
            items.splice(i, 1);
        }
    });

    return result;
}

export function camelTo(str, separator = '_') {
    return str.replace(/(\w)([A-Z])/g, `$1${separator}$2`).toLowerCase();
}