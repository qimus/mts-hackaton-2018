/**
 * @class AbstractProvider
 * @description Абстрактный класс провайдера данных
 */
export default class AbstractProvider {

    activePage = 1;
    perPage = 15;

    /**
     * @return {number}
     */
    getTotalCount() {
        throw new Error('Method not realized');
    }

    /**
     * Возвращает сквозной номер строки
     * @return {number}
     */
    getStartIndex() {
        return (this.getActivePage() - 1) * this.getPerPage();
    }

    /**
     * Возвращает всего количество страниц
     * @return {number}
     */
    getTotalPages() {
        return Math.ceil(this.getTotalCount() / this.getPerPage());
    }

    /**
     * Возвращает массив данных для вывода на странице
     * @return {array}
     */
    getItems() {
        throw new Error('Method not realized');
    }

    /**
     * Возвращает номер активной страницы
     * @return {number}
     */
    getActivePage() {
        return this.activePage;
    }

    /**
     * Установить номер активной страницы
     * @param page
     * @return {AbstractProvider}
     */
    setActivePage(page) {
        this.activePage = page;
        return this;
    }

    /**
     * Количество строк, которые выводятся на странице
     * @return {number}
     */
    getPerPage() {
        return this.perPage;
    }

    /**
     *
     * @param perPage
     * @return {AbstractProvider}
     */
    setPerPage(perPage) {
        this.perPage = perPage;
        return this;
    }

}
