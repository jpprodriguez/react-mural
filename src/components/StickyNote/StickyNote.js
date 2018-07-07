import React, { Component } from 'react';
import './StickyNote.css';

export function StickyNote(props){
    const noteWidth = 100;
    const noteHeight = 100;
    const noteStyle = {
        height: noteHeight,
        width: noteWidth,
        left: props.posX - noteWidth / 2,
        top: props.posY - noteHeight / 2

    };
    return (
        <div className='note-container' style={noteStyle} onClick={props.noteClicked}>

        </div>
    )
}

