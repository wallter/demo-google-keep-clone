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
    onUpdate?: (noteValues: NoteType) => Promise<void>;
    onBlur?: (noteValues: NoteType) => Promise<void>;
}

export default function Note({ 
    note, 
    creating = false, // default to false if not provided
    onUpdate, 
    onBlur 
}: NoteProps) {
    const componentRef = useRef(null)

    const [noteValues, setNoteValues] = useState<NoteType>({
        title: note.title || '',
        content: note.content || '',
        updated: note.updated
    });

    /**
     * react-use@useUpdateEffect handles updating the component state when the ref for
     * the props.note changes (ie the new note has been saved)
     */
    useUpdateEffect(() => {
        console.log('note Changed', {...note})
        setNoteValues({
            title: note.title || '',
            content: note.content || '',
            updated: note.updated
        })
    }, [note])

    /**
     * react-use@useDebounce handles the onUpdate event for us to account for focus and edits
     * between the multiple contentEditable elements within the component applying a debounce
     * to the onUpdate event(s) to prevent excessive calls to the onUpdate handler.
     */
    useDebounce(async () => {
        // don't fire onUpdated events for New notes
        if (!onUpdate) return
        if (noteValues.title === note.title && noteValues.content === note.content) return
        
        await onUpdate(noteValues)
        
        setNoteValues({...noteValues, updated: new Date()})
    }, 300, [noteValues])

    /**
     * react-use@useClickAway handles the onBlur event for us to account for focus and edits
     * between the multiple contentEditable elements within the component.
     */
    useClickAway(componentRef, async () => {
        if (onBlur) {
            await onBlur(noteValues)
        }
    });
    
    return (
        <div className="min-w-full py-2" ref={componentRef}>
            <div className="rounded overflow-hidden shadow-lg bg-yellow-300 dark:bg-yellow-600 hover:bg-yellow-400" data-note-id={note.id}>
                <div className="px-6 py-4 flex flex-col">
                    <input 
                        className={`font-bold text-xl mb-2 dark:text-zinc-800 bg-transparent placeholder-zinc-700`} 
                        aria-label="Title"
                        placeholder="Title"
                        onChange={(e) => setNoteValues({ ...noteValues, title: e.target.value || ''})}
                        value={noteValues.title}
                    />
                    <input 
                        className={`text-gray-700 text-base bg-transparent placeholder-gray-600`}
                        aria-label="Content"
                        placeholder="Take a note…"
                        tabIndex={creating ? 0 : -1}
                        role="textbox"
                        onChange={(e) => setNoteValues({ ...noteValues, content: e.target.value || ''})}
                        value={noteValues.content}
                    />
                </div>
                {!creating && <Footer updated={noteValues.updated} created={note.created} />}
            </div>
        </div>
    )
}