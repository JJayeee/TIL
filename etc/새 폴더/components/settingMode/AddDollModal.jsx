import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDollModalContents from './AddDollModalContents';

import '../../lib/styles/style.css';

export default class AddDollModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show:false
        }
    }

    render() {
        let closeModal = () => this.setState({show:false});

        return(
            <div md="auto" className="justify-content-md-center" style={{display:'flex', alignItems:'center'}}>
                <Button
                    id='button-day'
                    variant='primary'
                    style={{color:this.props.color, width:this.props.width, fontWeight:'bold'}}
                    onClick={function() {
                        this.setState({show:!this.state.show})
                    }.bind(this)}
                >기기등록</Button>
                <AddDollModalContents
                    size={this.props.size}
                    title='등록'
                    show={this.state.show}
                    onHide={closeModal}
                    changeFlag={this.props.changeFlag}
                    />
            </div>
        );
    }
}