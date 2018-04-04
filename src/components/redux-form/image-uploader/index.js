import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
//import * as messenger from 'common/messenger'
import {
    Icon,
    Segment
} from 'semantic-ui-react'

//components
import Gallery from 'workflow/components/gallery'
import Dropzone from '../dropzone'

import * as fileHelper from 'workflow/utils/file'
import { DEV_ENV } from 'workflow/constants/app'
import LabelExt from 'workflow/components/label-ext'

import './style.scss'

export default class PhotoUpload extends Component {

    dropzone = null;

    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.uploaded && this.state.files.length > 0) {
            //удаление из состояния загруженных файлов
            const newState = this.state.files.filter(item => {
                const itemId = fileHelper.getFileId(item);
                return _.get(nextProps.uploaded, `${itemId}.id`) === undefined;
            });
            this.setState({
                files: newState
            });
        }
    }

    handleUploadFiles = (files) => {
        files = Array.prototype.slice.call(files);

        this.setState(
            (prevState) => {
                return {
                    files: prevState.files.concat(
                        files.filter(file => {
                            const fileId = fileHelper.getFileId(file);
                            return !prevState.files.some(item => {
                                return fileHelper.getFileId(item) == fileId;
                            })
                        })
                    )
                }
            },
            () => {
                this.props.handleUploadFiles({ files, type: this.props.fileType })
                    .then(loadedFiles => {
                        let allFiles = this.props.input.value || [];
                        this.props.input.onChange(allFiles.concat(loadedFiles));
                    })
            }
        );
    };

    handleRemoveImage = (id) => {

        if (this.props.handleDeleteFile && !this.state.files.some(file => (fileHelper.getFileId(file) == id))) {
            this.props.handleDeleteFile(id)
                .then(id => {
                    this.props.input.onChange(
                        this.props.input.value.filter(file => {
                            return fileHelper.getFileId(file) != id;
                        })
                    );
                });
        }

        this.setState({
            files: this.state.files.filter(file => {
                return fileHelper.getFileId(file) != id
            })
        });
    };

    getLoadedImages = () => {
        const { input } = this.props;
        let images = [];
        if (input.value.length > 0) {
            input.value.forEach(image => {
                images.push({
                    src: image.url,
                    isFetching: _.get(image, 'isFetching', false),
                    isUploaded: true,
                    description: image.filename,
                    size: image.size,
                    id: image.id,
                    errorMessage: image.errorMessage,
                    download: image.download
                });
            })
        }

        return images;
    };

    render() {
        const { input, label, meta, uploaded, canEdit, ...custom } = this.props;
        const { files } = this.state;

        let loadedPhotos = this.getLoadedImages();
        if (files && files.length > 0) {

            files.forEach(item => {
                const fileId = fileHelper.getFileId(item);
                const uploadedFile = uploaded[ fileId ];

                let file = {
                    src: item.preview,
                    description: item.name,
                    isFetching: true,
                    isUploaded: false,
                    originalFile: item,
                    id: fileId
                };


                if (uploadedFile) {
                    file = {
                        ...file,
                        isFetching: uploadedFile.isFetching,
                        progress: uploadedFile.progress,
                        hasError: uploadedFile.errorMessage !== '',
                        errorMessage: uploadedFile.errorMessage,
                        download: uploadedFile.download
                    };
                }

                loadedPhotos.push(file);
            })
        }

        let galleryTitle = <LabelExt path={input.name}>{this.props.titleLoadedImages || ''}</LabelExt>;
        let gallery = (
            <div>
                <Gallery images={loadedPhotos || []}
                         handleRemoveImage={this.handleRemoveImage}
                         handleUploadFiles={this.handleUploadFiles}
                         canEdit={canEdit}
                         title={galleryTitle}/>
            </div>
        );

        return (
            <div className='image-uploader'>
                {canEdit && (
                    <Dropzone
                        accept='image/*'
                        input={input}
                        label={label}
                        meta={meta}
                        {...custom}
                        disableClick
                        handleUploadFiles={this.handleUploadFiles}
                        onDropAccepted={(acceptedFiles) => console.log(acceptedFiles)}
                        onDropRejected={(rejectedFiles) => {
                            rejectedFiles.forEach((file) => {
                                // messenger.error({
                                //     message: `Ошибка при загрузке файла '${file.name}' - неподдерживаемый тип файла${file.type.length > 0 ? ' ' + file.type : ''}.`
                                // })
                            })
                        }}
                        setRef={(dropzone) => this.dropzone = dropzone }
                        activeClassName='dropzone-area-active'
                        rejectClassName = 'dropzone-area-reject'
                        className='dropzone-area'>
                        <Segment secondary className='text-center area'>
                            <Icon name='cloud upload' size='big' />
                            Перетащите сюда файлы или нажмите <a href='#' onClick={(e) => {e.preventDefault(); this.dropzone.open()} }>обзор</a> для открытия окна выбора файлов
                        </Segment>

                        <p className='text-center area rejected'>
                            <Icon name='warning circle' style={{fontSize:'20px', marginRight: '4px'}} />
                            Вы пытаетесь загрузить файл недопустимого формата! Возможно загружать только файлы изображений!
                        </p>
                        {gallery}
                    </Dropzone>
                )}
                {!canEdit && gallery}
            </div>
        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    PhotoUpload.propTypes = {
        item: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.object,
        canEdit: PropTypes.bool,
        handleUploadFiles: PropTypes.func.isRequired,
        handleDeleteFile: PropTypes.func.isRequired,
        titleLoadedImages: PropTypes.string,
        fileType: PropTypes.integer,
        uploaded: PropTypes.array,
        input: PropTypes.object.isRequired
    };
}
