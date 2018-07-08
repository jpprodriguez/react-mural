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
            className={props.selected ? 'note-container selected' : 'note-container'}
            style={noteStyle}
            onClick={props.noteClicked}
            onDoubleClick={props.noteDoubleClicked}
        >
            <textarea disabled={true}></textarea>
        </div>
    )
}

