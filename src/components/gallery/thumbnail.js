import React from 'react'
import PropTypes from 'prop-types'
import filesize from 'filesize'

import {
    Image,
    Button,
    Icon,
    Loader,
    Popup,
    Card
} from 'semantic-ui-react'

import { confirm } from 'workflow/components/ui/dialogs'
import { DEV_ENV } from 'workflow/constants/app'

export default class Thumbnail extends React.Component {
    render() {
        let { image, canEdit } = this.props;
        let fsize = image.size ? filesize(image.size) : null;
        let iconStyle = {
            fontSize: (29 * this.props.calculatedHeight / 200) + 'px',
            //visibility: this.props.calculatedHeight != 200 ? 'hidden' : 'visible',
        };

        let bsStyle = this.props.bsStyle ||
            (image.errorMessage ? 'error' : (image.isUploaded && !image.isFetching ? 'success' : 'default'));

        return (
            <Card className={'component-thumbnail-container thumbnail ' + bsStyle} alt={this.props.alt} style={{position: 'relative'}}>
                <a href={image.src} onClick={::this.props.onClick} style={{marginBottom: 40}} data-pjax={0}>
                    <div
                        style={{
                            width: '100%',
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            height: this.props.calculatedHeight,
                            overflow: 'hidden'
                        }}
                        className={'ui medium rounded image component-thumbnail-image shadow-effect'}
                    >
                        <Image className='component-thumbnail-image shadow-effect'
                               style={{
                                   borderRadius: 0,
                                   width: 'auto',
                                   margin: '0 auto',
                                   boxShadow: 'none',
                                   position: 'absolute',
                                   left: '50%',
                                   top: '50%',
                                   transform: 'translate(-50%,-50%)'
                               }}
                               rounded
                               size='medium'
                               src={image.src}
                               alt={this.props.alt}/>
                    </div>
                </a>

                <div className='component-thumbnail-toolbar shadow-effect'>
                    <Button.Group>
                        {image.isUploaded && (
                            <Popup placement='top'
                                   content={'Скачать'}
                                   trigger={<Button color={'blue'} href={image.download || image.src}
                                                    target='_blank' download  data-pjax={0}>
                                       <Icon name={'download'}/>
                                   </Button>}/>
                        )}
                        {canEdit && image.errorMessage && image.originalFile && (
                            <Popup placement='top' content={'Повторить'} trigger={
                                <Button
                                    bsStyle='orange'
                                    color='orange'
                                    title='Повторить'
                                    onClick={() => this.props.handleUploadFiles([ image.originalFile ])}>
                                    <Icon name='repeat'/>
                                </Button>
                            } />
                        )}
                        {!image.isFetching && canEdit && (
                            <Popup placement='top' content={'Удалить'} trigger={<Button
                                color='red'
                                title='Удалить'
                                onClick={() => {
                                    confirm({
                                        content: `Удалить файл - ${image.description}?`,
                                        onConfirm: () => {
                                            this.props.handleRemoveImage(image.id)
                                        }
                                    })
                                }}>
                                <Icon name='remove'/>
                            </Button>}/>
                        )}
                    </Button.Group>
                </div>


                <Card.Content>
                    <div className='description-container'>
                        <div className='status'>
                            {image.isFetching && !image.errorMessage && (
                                <Loader type='ball-clip-rotate'/>
                            )}
                            {image.errorMessage && (
                                <Popup placement='top'
                                       content={<span>{image.errorMessage}</span>}
                                       trigger={<Icon name='remove circle' style={iconStyle} className='text-danger'/>} />
                            )}
                            {!image.errorMessage && !image.isFetching && image.isUploaded && (
                                <Icon name='checkmark box' style={{...iconStyle, float: 'left'}} className='text-success'/>
                            )}
                        </div>
                        <div className='description'>
                            {(image.description) && (
                                <Popup placement='top'
                                       content={<span>{image.description}</span>}
                                       trigger={<p className='component-thumbnail-description ellipsis'>
                                           <a href={image.src} onClick={::this.props.onClick}>
                                               {image.description}
                                           </a>
                                       </p>} />
                            )}
                        </div>
                        <div className='size'>
                            {image.size && (
                                <Popup placement='top'
                                       content={<span>{fsize}</span>}
                                       trigger={<p className='component-thumbnail-description'>{fsize}</p>}/>
                            )}
                        </div>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    Thumbnail.propTypes = {
        image: PropTypes.object,
        canEdit: PropTypes.bool,
        calculatedHeight: PropTypes.number,
        bsStyle: PropTypes.string,
        alt: PropTypes.string,
        onClick: PropTypes.func,
        handleUploadFiles: PropTypes.func,
        handleRemoveImage: PropTypes.func
    };
}