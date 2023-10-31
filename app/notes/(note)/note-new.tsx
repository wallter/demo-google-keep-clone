'use client';

import { useState } from "react"
import Note, { NoteEventProps } from "./note"
import pocketBase from "@/app/(pocketbase)/pocketbase";
import { NoteType } from "./types";

// an empty object that could be filled with defaults 🤷‍♂️
const initalNote: NoteType = {}

interface NoteNewProps {
    onCreate?: () => Promise<void>;
}

export default function NoteNew({ onCreate }: NoteNewProps) {
    const [note, setNote] = useState({...initalNote})

    console.log('NoteNew', {...note})

    const updateNote = async ({ title, content}: NoteEventProps) => {
        setNote({...note, title, content})
    }

    const createNote = async (newNote: any) => {
        if (!newNote.title && !newNote.content) return

        console.log("Creating note", { newNote })

        const createdNote = await pocketBase.collection('notes').create(newNote)

        if (onCreate) {
            await onCreate()
        }
        
        console.log('Created note', { createdNote })

        setNote({...initalNote})
    }

    return (
        <div className="w-full md:w-2/3 lg:w-3/5">
            <Note creating note={note} onUpdate={updateNote} onBlur={createNote} />        
        </div>
    )
}