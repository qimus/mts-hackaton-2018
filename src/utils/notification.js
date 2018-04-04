import alertify from 'alertifyjs/build/alertify.min'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/semantic.min.css'

alertify.set('notifier','position', 'top-right');

export default {
    success: (message = 'Операция выполнена успешно') => {
        alertify.success(message);
    },
    error: (message) => {
        alertify.error(message);
    }
};