import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

import {
    Form,
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

const DropzoneWrapper = ({ input, label, dropzoneOnDrop, setRef, meta: { touched, error, warning }, handleUploadFiles, ...custom }) => {

    const handleDrop = (acceptedFiles, rejectedFiles, e) => {
        handleUploadFiles && handleUploadFiles(acceptedFiles);
        if (custom.multiple && input.value && input.value.length > 0) {
            acceptedFiles = input.value.concat(acceptedFiles)
        }
        dropzoneOnDrop && dropzoneOnDrop(acceptedFiles, rejectedFiles, e);
    };

    return (
        <Form.Field>
            <label>{label}</label>
            <Dropzone
                onDrop={handleDrop}
                ref={(ref) => setRef(ref)}
                {...custom} />
            {touched && ((error && <span className='text-danger'>{error}</span>) || (warning &&
            <span>{warning}</span>))}
        </Form.Field>
    )
};

export default DropzoneWrapper;

if (process.env.NODE_ENV === DEV_ENV) {
    DropzoneWrapper.propTypes = {
        input: PropTypes.object,
        label: PropTypes.string,
        dropzoneOnDrop: PropTypes.func,
        setRef: PropTypes.func,
        meta: PropTypes.object,
        handleUploadFiles: PropTypes.func.isRequired
    };
}