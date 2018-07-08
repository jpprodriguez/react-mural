import React, { Component } from 'react';
import './StickyNote.css';

export function StickyNote(props){
    const noteStyle = {
        zIndex: props.zIndex,
        height: props.height,
        width: props.width,
        left: props.posX,
        top: props.posY
    };
    return (
        <div
            className='note-container'
            tabIndex={0}
            style={noteStyle}
            onClick={props.noteClicked}
            onFocus={props.noteFocus}
            onBlur={props.noteBlur}
        >
            <textarea></textarea>
        </div>
    )
}

