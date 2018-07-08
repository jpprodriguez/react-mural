import React, { Component } from 'react';
import './Board.css';
import { StickyNote } from '../StickyNote/StickyNote';

export class Board extends Component {
    noteWidth = 100;
    noteHeight = 100;
    noteClicked = false;
    clickTimeoutID = null;
    constructor(props) {
        super(props);
        this.state = {
            notes: Array(),
            noteCount: 0,
            selectedNotes: Array()
        }
        this.noteClicked = false;
    }
    render() {
        let noteList = this.state.notes;
        const notes = noteList.map((note) => {
            return (
                <StickyNote
                    key={note.id}
                    selected={note.selected}
                    editable={note.editable}
                    zIndex={note.zIndex}
                    width={this.noteWidth}
                    height={this.noteHeight}
                    posX={note.posX}
                    posY={note.posY}
                    dblClickDelay={this.props.dblClickDelay}
                    noteClicked={(shiftKeyPressed) => {this.noteClickHandle(note,shiftKeyPressed,false)}}
                    noteDoubleClicked={(shiftKeyPressed) => {this.noteClickHandle(note,shiftKeyPressed,true)}}
                >
                </StickyNote>
            );
        });
        return (
            <div
                className='container'
                onClick={(e) => this.boardClickHandler(e, this.props.dblClickDelay)}
            >
            {notes}
            </div>
        )
    }

    noteClickHandle(note,shiftKeyPressed,isDblClick) {
        this.noteClicked = true;
        let selectedNotes = this.state.selectedNotes.slice();
        let noteList = this.state.notes.slice();
        let index = noteList.indexOf(note);
        let isNoteEditable = note.editable ? true : false;

        if(!shiftKeyPressed && selectedNotes.length > 0) {
            noteList = this.restoreNotesZIndex(noteList, selectedNotes);
            selectedNotes = Array();
        }

        noteList[index].zIndex = 9999;
        noteList[index].selected = true;
        if(isDblClick || isNoteEditable) {
            noteList[index].editable = true;
        }

        this.setState({
            notes: noteList,
            selectedNotes: selectedNotes.concat(noteList[index])
        });
    }
    boardClickHandler(event, delay) {
        let self = this;
        if (!this.clickTimeoutID) {
            this.clickTimeoutID = setTimeout(function () {
                self.boardSingleClickHandle();
                self.clickTimeoutID = null
            }, delay);
        } else {
            this.clickTimeoutID = clearTimeout(this.clickTimeoutID);
            this.boardDoubleClickHandle(event);
        }
    }
    boardSingleClickHandle() {
        if (!this.noteClicked) {
            let noteList = this.state.notes.slice();
            let selectedNotes = this.state.selectedNotes.slice();
            noteList = this.restoreNotesZIndex(noteList, selectedNotes);
            selectedNotes = Array();
            this.setState({
                notes: noteList,
                selectedNotes: selectedNotes
            });
        } else {
            this.noteClicked = false;
        }
    }
    boardDoubleClickHandle(event) {
        if (!this.noteClicked) {
            let noteList = this.state.notes.slice();
            let selectedNotes = this.state.selectedNotes.slice();
            let noteCount = this.state.noteCount + 1;
            let pos = this.validateNotePosition(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
            let newNote = {
                id: noteCount,
                selected: true,
                editable: true,
                zIndex: noteCount,
                posX: pos.posX,
                posY: pos.posY
            }

            if(selectedNotes.length > 0) {
                noteList = this.restoreNotesZIndex(noteList, selectedNotes);
                selectedNotes = Array();
            }


            this.setState({
                notes: noteList.concat(newNote),
                noteCount: noteCount,
                selectedNotes: selectedNotes.concat(newNote)
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

    restoreNotesZIndex(noteList, selectedNotes) {
        let newNotes = noteList.slice();
        for(let note of selectedNotes) {
            let index = newNotes.indexOf(note);
            newNotes[index].zIndex = note.id;
            newNotes[index].selected = false;
            newNotes[index].editable = false;
        }
        return newNotes;
    }
}

