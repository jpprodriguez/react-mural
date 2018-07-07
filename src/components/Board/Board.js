import React, { Component } from 'react';
import './Board.css';
import { StickyNote } from '../StickyNote/StickyNote';

export class Board extends Component {
    noteClicked;
    constructor(props) {
        super(props);
        this.state = {
            notes: Array(),
            noteCount: 0
        }
        this.noteClicked = false;
    }
    render() {
        let noteList = this.state.notes;
        const notes = noteList.map((note) => {
            return (
                <StickyNote
                    key={note.id}
                    posX={note.posX}
                    posY={note.posY}
                    noteClicked={() => {this.noteClickHandle()}}
                >
                </StickyNote>
            );
        });
        return (
            <div className='container' onClick={e => this.boardClickHandle(e)}>
            {notes}
            </div>
        )
    }

    noteClickHandle() {
        this.noteClicked = true;
    }
    boardClickHandle(event) {
        if (!this.noteClicked) {
            console.log(event.nativeEvent.offsetX);
            console.log(event.nativeEvent.offsetY);
            let noteList = this.state.notes;
            let noteCount = this.state.noteCount + 1;
            this.setState({
                notes: noteList.concat({
                    id: noteCount,
                    posX: event.nativeEvent.offsetX,
                    posY: event.nativeEvent.offsetY
                }),
                noteCount: noteCount
            });
        } else {
            this.noteClicked = false;
        }
    }
}

