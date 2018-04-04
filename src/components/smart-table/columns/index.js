import SimpleColumn from './simple'
import SerialColumn from './serial'

export const SIMPLE_COLUMN = 'simple';
export const SERIAL_COLUMN = 'serial';

export default function factory(type) {
    switch (type) {
        case SERIAL_COLUMN:
            return SerialColumn;
        default:
            return SimpleColumn
    }
}
