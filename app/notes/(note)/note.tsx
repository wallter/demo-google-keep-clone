'use client';

import { useRef, useState } from 'react';
import Footer from './footer'
import { useClickAway, useDebounce, useUpdateEffect } from 'react-use';
import { NoteType } from './types';

export interface NoteEventProps {
    title: string; 
    content: string 
}

interface NoteProps {
    note: NoteType;
    creating?: boolean;
    onInput?: (noteValues: NoteEventProps) => Promise<void>;
    onBlur?: (noteValues: NoteEventProps) => Promise<void>;
}

export default function Note({ 
    note, 
    creating = false, // default to false if not provided
    onInput, 
    onBlur 
}: NoteProps) {
    const componentRef = useRef(null)

    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [updated, setUpdated] = useState(note.updated)

    const noteValues: NoteEventProps = { title, content }

    /**
     * react-use@useDebounce handles the onInput event for us to account for focus and edits
     * between the multiple contentEditable elements within the component applying a debounce
     * to the onInput event(s) to prevent excessive calls to the onInput handler.
     */
    useDebounce(async () => {
        if (!onInput) return
        if (noteValues.title === note.title && noteValues.content === note.content) return
        
        await onInput(noteValues)
        
        setUpdated(new Date())
    }, 300, [noteValues, creating])

    /**
     * react-use@useClickAway handles the onBlur event for us to account for focus and edits
     * between the multiple contentEditable elements within the component.
     */
    useClickAway(componentRef, async () => {
        if (onBlur) {
            await onBlur(noteValues)
        }
    });

    // not working :(
    // // Use useEffect to update state when the note prop changes
    // useUpdateEffect(() => {
    //     console.log('Note updated inside Note', creating, note.id, note.title, note.content)
    //     // Update state values when the note prop changes
    //     setTitle(note.title);
    //     setContent(note.content);
    //     setUpdated(note.updated);
    // }, [note]);

    return (
        <div className="min-w-full py-2" ref={componentRef}>
            <div className="rounded overflow-hidden shadow-lg bg-yellow-300 dark:bg-yellow-600 hover:bg-yellow-400" data-note-id={note.id}>
                <div className="px-6 py-4">
                    <div 
                        className="placeholder font-bold text-xl mb-2 dark:text-zinc-800" 
                        contentEditable
                        suppressContentEditableWarning
                        aria-label="Title"
                        onInput={(e) => setTitle(e.currentTarget.textContent || '')}
                        >
                        {note.title}
                    </div>
                    <div 
                        className="placeholder text-gray-700 text-base" 
                        contentEditable
                        suppressContentEditableWarning
                        aria-label="Content"
                        tabIndex={creating ? 0 : -1}
                        role="textbox"
                        onInput={(e) => setContent(e.currentTarget.textContent || '')}
                        >
                        {note.content}
                    </div>
                </div>
                {!creating && <Footer updated={updated} created={note.created} />}
            </div>
        </div>
    )
}