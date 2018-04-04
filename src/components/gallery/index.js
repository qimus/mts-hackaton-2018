import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'react-images'

import {
    Grid,
    Card
} from 'semantic-ui-react'

import Thumbnail from './thumbnail'
import { DEV_ENV } from 'workflow/constants/app'

const STACKED_LG = 1365;
const STACKED_XS = 985;
const STACKED_MAX = 1600;

export default class Gallery extends Component {

    static propTypes = {
        images: PropTypes.array.isRequired,
        title: PropTypes.string,
        handleRemoveImage: PropTypes.func,
        canEdit: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            currentImageIndex: 0,
            isOpen: false,
            width: window.innerWidth,
        };
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    openLightbox = (index, e) => {
        e.preventDefault();
        this.setState({
            isOpen: true,
            currentImageIndex: index
        });
    };

    closeLightbox = () => {
        this.setState({
            isOpen: false,
            currentImageIndex: 0
        });
    };

    gotoPrev = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex - 1
        });
    };

    gotoNext = () => {
        this.setState({
            currentImageIndex: this.state.currentImageIndex + 1
        });
    };

    gotoImage = (index) => {
        this.setState({
            currentImageIndex: index,
        });
    };

    itemsPerRow = () => {
        let result = 5;

        if (this.state.width <= STACKED_XS) {
            result = 2;
        } else if (this.state.width > STACKED_XS && this.state.width <= STACKED_LG) {
            result = 3;
        } else if (this.state.width > STACKED_LG && this.state.width <= STACKED_MAX) {
            result = 4;
        }

        return result;
    };

    calculateHeight = () => {
        let result = 200;
        let maxWidth = STACKED_MAX;

        if (this.state.width <= STACKED_XS) {
            maxWidth = STACKED_XS;
        } else if (this.state.width > STACKED_XS && this.state.width <= STACKED_LG) {
            maxWidth = STACKED_LG;
        } else if (this.state.width > STACKED_LG && this.state.width <= STACKED_MAX) {
            maxWidth = STACKED_MAX;
        } else {
            maxWidth = window.innerWidth;
        }

        result = (result - 20) * (window.innerWidth > maxWidth ? maxWidth / window.innerWidth : window.innerWidth / maxWidth);

        if (result > 200 || maxWidth === window.innerWidth) {
            result = 200;
        }

        return result;
    };

    handleClickImage = () => {
        if (this.state.currentImageIndex === this.props.images.length - 1) {
            return;
        }

        this.gotoNext();
    };

    renderGallery = () => {
        const { images, canEdit } = this.props;
        let calculatedHeight = this.calculateHeight();
        let itemsPerRow = this.itemsPerRow();

        if (this.state.width < STACKED_XS / 1.5) {
            calculatedHeight = 200;
        }

        const gallery = images.map((image, i) => {
            return (
                <Thumbnail
                    key={image.src}
                    image={image}
                    onClick={(e) => this.openLightbox(i, e)}
                    handleUploadFiles={this.props.handleUploadFiles}
                    handleRemoveImage={this.props.handleRemoveImage}
                    canEdit={canEdit}
                    calculatedHeight={calculatedHeight}
                    alt='242x200' />
            )
        });

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={itemsPerRow}>
                            {gallery}
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    };

    render() {

        const { title, images } = this.props;

        return (
            <div className='section'>
                {title && images && images.length > 0 && (<h4 style={{marginTop:'32px', marginLeft: '16px'}}>{title}</h4>)}
                {this.renderGallery()}
                <Lightbox
                    currentImage={this.state.currentImageIndex}
                    images={images}
                    isOpen={this.state.isOpen}
                    onClickImage={this.handleClickImage}
                    onClickNext={this.gotoNext}
                    onClickPrev={this.gotoPrev}
                    onClickThumbnail={this.gotoImage}
                    onClose={this.closeLightbox}
                    showThumbnails={this.props.showThumbnails}
                    theme={this.props.theme}
                />
            </div>
        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    Gallery.propTypes = {
        handleUploadFiles: PropTypes.func.isRequired,
        showThumbnails: PropTypes.bool,
        theme: PropTypes.string,
        show: PropTypes.bool
    };
}