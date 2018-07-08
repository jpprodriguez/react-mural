import React, { Component } from 'react';
import './Board.css';
import { StickyNote } from '../StickyNote/StickyNote';

export class Board extends Component {
    noteWidth = 100;
    noteHeight = 100;
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
                    zIndex={note.zIndex}
                    width={this.noteWidth}
                    height={this.noteHeight}
                    posX={note.posX}
                    posY={note.posY}
                    noteClicked={() => {this.noteClickHandle()}}
                    noteFocus={() => this.noteFocusHandle(note)}
                    noteBlur={() => this.noteBlurHandle(note)}
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
    noteBlurHandle(note) {
        let index = this.state.notes.indexOf(note);
        note.zIndex = note.id;
        let newNotes = this.state.notes;
        newNotes[index] = note;
        this.setState({
            notes: newNotes
        });
    }
    noteFocusHandle(note) {
        let index = this.state.notes.indexOf(note);
        note.zIndex = 9999;
        let newNotes = this.state.notes;
        newNotes[index] = note;
        this.setState({
            notes: newNotes
        });
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
            let pos = this.validateNotePosition(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            this.setState({
                notes: noteList.concat({
                    id: noteCount,
                    zIndex: noteCount,
                    posX: pos.posX,
                    posY: pos.posY
                }),
                noteCount: noteCount
            });
        } else {
            this.noteClicked = false;
        }
    }

    validateNotePosition(offsetX, offsetY) {
        let pos = {
            posX: offsetX - this.noteWidth / 2,
            posY: offsetY - this.noteHeight / 2
        };

        if((pos.posX + this.noteWidth) > this.props.size.width) {
            pos.posX = this.props.size.width - this.noteWidth;
        }
        else if(pos.posX < 0) {
            pos.posX = 0;
        }

        if((pos.posY + this.noteHeight) > this.props.size.height) {
            pos.posY = this.props.size.height - this.noteHeight;
        }
        else if(pos.posY < 0) {
            pos.posY = 0;
        }

        return pos;
    }
}

