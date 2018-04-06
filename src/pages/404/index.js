import React, { Component } from 'react'

export default class NotFound extends Component {
    render() {
        return (
            <div className="background" style={{backgroundColor: '#000'}}>
                <span className="background__cache"></span>
                <img src="https://media1.giphy.com/media/Eq7T3GwDAlggE/giphy.gif" className="fadeIn" data-width="500"
                     data-height="281" style={{width: '90%', marginLeft: '6%'}} />
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    left: '10%',
                }}>
                    <div style={{fontSize: 100}}>Ooh Shit!</div>
                </div>
            </div>
        )
    }
}