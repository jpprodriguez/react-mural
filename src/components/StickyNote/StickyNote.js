import React, { Component } from 'react';
import './StickyNote.css';

export function StickyNote(props){
    const noteStyle = {
        left: props.posX,
        top: props.posY
    };
    return (
        <div className='note-container' style={noteStyle}>

        </div>
    )
}

