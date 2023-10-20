'use client';

import { useState } from "react"
import Note, { NoteEventProps } from "./note"
import pocketBase from "@/app/(pocketbase)/pocketbase";
import { NoteType } from "./types";

const initalNote: NoteType = {
    id: undefined,
    title: 'Title',
    content: 'Take a note…',
    image: undefined,
    sort: undefined
}

interface NoteNewProps {
    onCreate?: () => Promise<void>;
}

export default function NoteNew({ onCreate }: NoteNewProps) {
    const [note, setNote] = useState({...initalNote})

    const updateNote = async ({ title, content}: NoteEventProps) => {
        setNote({...note, title, content})
    }

    const createNote = async (newNote: any) => {
        console.log('createNote', { newNote: {...newNote}, initalNote })
        if (newNote.title === initalNote.title && newNote.content === initalNote.content) return

        console.log("Creating note", { newNote })

        const createdNote = await pocketBase.collection('notes').create(newNote)

        if (onCreate) {
            await onCreate()
        }
        
        console.log('Created note', { createdNote })

        setNote({...initalNote})
    }

    console.log('NoteNew', note.id, note.title, note.content)

    return (
        <div className="w-full md:w-2/3 lg:w-3/5">
            <Note creating note={note} onInput={updateNote} onBlur={createNote} />        
        </div>
    )
}