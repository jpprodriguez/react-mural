import React, { Component } from 'react';
import './StickyNote.css';

export class StickyNote extends Component {
    clickTimeoutID = null;
    text;
    constructor(props) {
        super(props);
        this.noteStyle = {
            zIndex: props.zIndex,
            height: props.height - 20,
            width: props.width - 20,
            left: props.posX,
            top: props.posY
        };
    }
    componentDidMount(){
        if(this.props.editable) {
            this.text.focus();
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.editable && !prevProps.editable) {
            this.text.focus();
        }
    }
    render() {
        this.noteStyle = {
            zIndex: this.props.zIndex,
            height: this.props.height - 20,
            width: this.props.width - 20,
            left: this.props.posX,
            top: this.props.posY
        };
        return (
            <div
                className={this.props.selected ? 'note-container selected' : 'note-container'}
                style={this.noteStyle}
                onClick={(e) => this.noteClickHandler(e,this.props.dblClickDelay)}
            >
                <textarea
                    disabled={!this.props.editable}
                    ref={(ref) => {this.text = ref}}
                >
                </textarea>
            </div>
        )
    }

    noteClickHandler(event, delay) {
        let self = this;
        let shiftKeyPressed = event.shiftKey ? true : false;
        if (!this.clickTimeoutID) {
            this.clickTimeoutID = setTimeout(function () {
                self.props.noteClicked(shiftKeyPressed);
                self.clickTimeoutID = null
            }, delay);
        } else {
            this.clickTimeoutID = clearTimeout(this.clickTimeoutID);
            this.props.noteDoubleClicked(shiftKeyPressed);
        }
    }
}

