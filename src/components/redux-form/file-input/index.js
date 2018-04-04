import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import filesize from 'filesize'

import {
    Form,
    Icon,
    Button,
    Popup,
    List
} from 'semantic-ui-react'

import './style.scss'

import LabelExt from 'workflow/components/label-ext'
import InfoIcon from 'workflow/components/redux-form/common/info-icon'
import { confirm } from 'workflow/components/ui/dialogs'
import * as fileHelper from 'workflow/utils/file'
import { DEV_ENV } from 'workflow/constants/app'

/**todo: отрафакторить, выделить компонент item **/

export default class FileInputAjax extends Component {

    constructor(props) {
        super(props);

        this.fileRef = null;
        this.state = {
            files: [],
            edited: this.getFileEditedInfo()
        };
    }

    getFileEditedInfo = () => {

        const { input } = this.props;
        let changes = {};

        if (input.value && Array.isArray(input.value) && input.value.length > 0) {

            input.value.map(file => {
                changes[ file.id ] = {
                    description: file.description,
                    isUpdate: false
                };
            });
        }

        return changes;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.uploaded && this.state.files.length > 0) {
            //удаление из состояния загруженных файлов
            const newState = this.state.files.filter(item => {
                const itemId = fileHelper.getFileId(item);

                return !nextProps.uploaded[ itemId ]
                    || nextProps.uploaded[ itemId ][ 'id' ] === undefined;
            });

            this.setState({
                files: newState
            });
        }
    }

    handleUploadSingleFile = (files) => {
        if (this.props.handleUploadFiles) {
            this.props.handleUploadFiles({ files, type: this.props.fileType, typeAlias: this.props.fileTypeAlias })
                .then(loadedFiles => {
                    this.props.input.onChange(loadedFiles);
                });
        }
        this.setState({
            files: files
        });
    };

    handleUploadFiles = (files) => {
        if (this.props.handleUploadFiles) {
            this.props.handleUploadFiles({ files, type: this.props.fileType, typeAlias: this.props.fileTypeAlias })
                .then(loadedFiles => {
                    let allFiles = this.props.input.value || [];
                    this.props.input.onChange(allFiles.concat(loadedFiles));
                })
                .catch(() => {})
        }
    };

    handleChange = (e) => {
        let files = Array.prototype.slice.call(e.target.files);
        const { multiple, input } = this.props;

        files.forEach(file => {
            file.id = fileHelper.generateUniqId(file);
        });

        if (!multiple) {
            if (input.value && input.value.length > 0) {
                Promise.all(
                    input.value.map(item => {
                        return this.props.handleDeleteFile(item.id);
                    })
                ).then(() => {
                    this.handleUploadSingleFile(files);
                })
            } else {
                this.setState(() => {
                    return { files: files };
                }, () => {
                    this.handleUploadFiles(files);
                });
            }
        } else {
            this.setState((prevState) => {
                return { files: prevState.files.concat(files) };
            }, () => {
                this.handleUploadFiles(files);
            });
        }
        this.fileRef.value = '';
    };

    handleDeleteFile = (id) => {

        if (this.props.handleDeleteFile && !this.state.files.some(file => (fileHelper.getFileId(file) == id))) {
            this.props.handleDeleteFile(id)
                .then(id => {
                    this.props.input.onChange(
                        this.props.input.value.filter(file => {
                            return fileHelper.getFileId(file) != id;
                        })
                    );
                })
        }

        this.setState({
            files: this.state.files.filter(file => {
                return fileHelper.getFileId(file) != id
            })
        });
    };

    getLoadedFiles = () => {
        const { input } = this.props;

        if (!input.value) {
            return [];
        }

        return input.value.map(file => {
            return {
                id: file.id,
                name: file.filename,
                isUploaded: true,
                isFetching: _.get(file, 'isFetching', false),
                size: file.size,
                mime: file.mime,
                errorMessage: file.errorMessage,
                url: file.url,
                download: file.download,
                description: file.description,
                filename: file.filename
            };
        });
    };

    handleUpdateFile = (id, { description }) => {
        return this.props.handleUpdateFile(id, { description })
            .then(updatedFile => {
                let files = (this.props.input.value || []).map(file => {
                    if (file.id == updatedFile.id) {
                        return updatedFile;
                    }

                    return file;
                });
                this.props.input.onChange(files);
            })
    };

    render() {

        const { input, label, meta: { touched, error, warning }, buttonLabel, uploaded, ...custom } = this.props;
        const { files } = this.state;

        let loadedFiles = this.getLoadedFiles();

        if (files && files.length > 0) {
            files.forEach(item => {
                const fileId = fileHelper.getFileId(item);
                const uploadedFile = uploaded[ fileId ];

                let file = {
                    id: fileId,
                    name: item.name,
                    isFetching: true,
                    isUploaded: false,
                    originalFile: item,
                    description: item.description
                };


                if (uploadedFile) {
                    file = {
                        ...file,
                        isFetching: uploadedFile.isFetching,
                        progress: uploadedFile.progress,
                        hasError: uploadedFile.errorMessage !== '',
                        errorMessage: uploadedFile.errorMessage,
                        url: uploadedFile.url,
                        download: uploadedFile.download,
                        description: uploadedFile.description
                    };
                }

                loadedFiles.push(file);
            });
        }

        return (
            <Form.Field style={{ wordWrap: 'break-word' }} error={touched && error}>
                <LabelExt path={input.name} style={{display: 'inline-block'}}>{label}</LabelExt>
                {touched && error && <InfoIcon item={error}/>}
                {this.props.canEdit && (
                    <div>
                        <input ref={(ref) => this.fileRef = ref}
                               type='file'
                               style={{ display: 'none' }}
                               onChange={this.handleChange}
                               {...custom}/>
                        <div>
                            <Button onClick={(e) => {
                                e.preventDefault();
                                this.fileRef.click();
                            }}>{buttonLabel || 'Загрузить'}</Button>
                        </div>
                    </div>
                )}

                {loadedFiles && loadedFiles.length > 0 && (
                    <List celled verticalAlign='middle' className='file-list'>
                        {loadedFiles.map(item => this.renderItem(item))}
                    </List>
                )}
                {!this.props.canEdit && (!loadedFiles || loadedFiles.length === 0) && <i>(не выбрано)</i>}
                {touched && ((error && <span className='text-danger'>{error}</span>) || (warning &&
                    <span>{warning}</span>))}
            </Form.Field>
        )
    }

    renderItem(item) {
        const { multiple, canEdit } = this.props;

        if (!multiple && item.isFetching && item.isUploaded) {
            return null;
        }

        let title = '';

        if (item.url) {
            title = <a href={item.download || item.url} target='_blank' download>{item.name}</a>
        } else {
            title = <span>{item.name}</span>
        }

        let fsize = item.size ? filesize(item.size) : null;
        let fileField = {};

        if (item.id && this.state.edited[ item.id ]) {
            fileField = this.state.edited[ item.id ];
        }

        let errorIcon = <Icon name='remove circle' size='big' className='text-danger'/>,
            uploadDescription = (
                <span className='component-uploader-description'
                      style={{ padding: '10px' }}>{title}</span>
            );

        return (
            <List.Item key={item.id}>
                <div className='icon-status'>
                    {item.isFetching && !item.errorMessage && (
                        <Icon name='spinner' size='big' loading/>
                    )}
                    {item.errorMessage && (
                        <Popup placement='top'
                               content={item.errorMessage}
                               trigger={errorIcon}/>
                    )}
                    {!item.errorMessage && !item.isFetching && item.isUploaded && (
                        <Icon name='checkmark box' size='big' color={'green'}/>
                    )}
                </div>
                <List.Content className='inline'>
                    <List.Description>
                        {title && (
                            <Popup placement='top' content={item.name} trigger={uploadDescription}/>
                        )}
                        {item.size && ( <span className='component-uploader-description'>{fsize}</span> )}
                    </List.Description>
                </List.Content>
                <List.Content>
                    {item.description && fileField && !fileField.isUpdate && (
                        <List.Description className='file-description text-muted ellipsis'
                                          title={item.description}>
                            {item.description}
                        </List.Description>
                    )}
                </List.Content>
                <List.Content>

                    {fileField && fileField.isUpdate && (
                        <Form.Group>
                            <Form.Input type='text'
                                        width={11}
                                        autoFocus
                                        defaultValue={fileField.description || ''}
                                        onChange={e => {
                                            this.setState({
                                                edited: {
                                                    ...this.state.edited,
                                                    [item.id]: {
                                                        ...fileField,
                                                        description: e.target.value,
                                                    }
                                                }
                                            })
                                        }}
                            />
                            <Button positive
                                    title='Сохранить'
                                    onClick={() => {
                                        this.handleUpdateFile(item.id, fileField)
                                            .then(() => {
                                                this.setState({
                                                    edited: {
                                                        ...this.state.edited,
                                                        [item.id]: {
                                                            ...fileField,
                                                            isUpdate: false
                                                        }
                                                    }
                                                });
                                            });
                                    }}
                            > <Icon name='checkmark'/></Button>
                        </Form.Group>
                    )}
                </List.Content>

                <div className='component-uploader-toolbar' style={{top: 5, boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
                    <Button.Group>
                        {!item.isFetching && item.errorMessage != '' && !item.isUploaded && (
                            <Popup placement='top' content={'Повторить'} trigger={<Button
                                title='Повторить'
                                positive
                                color='orange'
                                onClick={() => {
                                    this.handleUploadFiles([ item.originalFile ])
                                }}>
                                <Icon name='repeat' size='small'/>
                            </Button>}/>
                        )}
                        {item.isUploaded && canEdit && (
                            <Popup placement='top' content={<span>Редактировать</span>} trigger={<Button
                                title='Редактировать'
                                positive
                                color='green'
                                onClick={() => {
                                    this.setState({
                                        edited: {
                                            ...this.state.edited,
                                            [item.id]: {
                                                ...fileField,
                                                isUpdate: !fileField.isUpdate
                                            }
                                        }
                                    })
                                }}>
                                <Icon name='edit' size='small'/>
                            </Button>}/>
                        )}
                        {!item.isFetching && canEdit && (
                            <Popup placement='top' content={'Удалить'} trigger={<Button
                                color='red'
                                title='Удалить'
                                onClick={() => {
                                    confirm({
                                        content: `Удалить файл - ${item.filename}?`,
                                        onConfirm: () => {
                                            this.handleDeleteFile(item.id)
                                        }
                                    })
                                }}>
                                <Icon name='remove' size='small'/>
                            </Button>}/>
                        )}
                    </Button.Group>
                </div>
            </List.Item>)
    }
}


if (process.env.NODE_ENV === DEV_ENV) {
    FileInputAjax.propTypes = {
        input: PropTypes.object.isRequired,
        uploaded: PropTypes.array,
        multiple: PropTypes.bool,
        label: PropTypes.string,
        meta: PropTypes.object,
        buttonLabel: PropTypes.string,
        bsStyle: PropTypes.object,
        handleUploadFiles: PropTypes.func.isRequired,
        handleDeleteFile: PropTypes.func.isRequired,
        handleUpdateFile: PropTypes.func.isRequired,
        canEdit: PropTypes.bool,
        fileType: PropTypes.number,
        fileTypeAlias: PropTypes.string
    };
}