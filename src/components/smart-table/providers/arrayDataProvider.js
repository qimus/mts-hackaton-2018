import AbstractProvider from './abstractProvider'

export default class ArrayDataProvider extends AbstractProvider {
    constructor(data) {
        super();
        this.data = data;
    }

    /**
     * @inheritDoc
     */
    getTotalCount() {
        return this.data.length;
    }

    /**
     * @inheritDoc
     */
    getItems() {
        return this.data.slice(this.getStartIndex(), this.getActivePage() * this.getPerPage());
    }

    /**
     *
     * @param {array} data
     * @return {ArrayDataProvider}
     */
    setData(data) {
        this.data = data;
        return this;
    }

}