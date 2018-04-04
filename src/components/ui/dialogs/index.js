import React  from 'react'
import ReactDOM from 'react-dom'

import ConfirmDialog from 'workflow/components/ui/confirm-dialog'
import AlertDialog from 'workflow/components/ui/alert-dialog'

function renderModal({component:Component, ...props}) {
    const containerId = 'rc_modal_alert';
    let container = document.getElementById(containerId);
    if (container) {
        container.remove();
    }

    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);

    ReactDOM.render(
        <Component {...props} />,
        document.getElementById(containerId)
    );
}

export function alert({message = '', title = 'Внимание!', onClose}) {
    return renderModal({
        message, 
        title,
        onClose,
        component: AlertDialog
    });
}

export function confirm({content = '', header = 'Подтверждение операции', onConfirm, onClose}) {
    return renderModal({
        content,
        header,
        closeCallback: onClose,
        confirmCallback: onConfirm,
        component: ConfirmDialog,
        open: true
    });
}
