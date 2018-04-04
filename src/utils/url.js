import { BASE_URL } from 'workflow/constants/app'

/**
 * Функция возвращает правильно сгенеренную ссылку
 * @param {String} link
 * @returns {string}
 */
export function to(link = '') {
    link = '' + link;
    if (link.indexOf('/') === 0) {
        link = link.substr(1);
    }

    return `${BASE_URL}/${link}`
}
