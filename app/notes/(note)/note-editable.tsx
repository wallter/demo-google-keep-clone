'use client';

import pocketBase from "@/app/(pocketbase)/pocketbase";
import Note, { NoteEventProps } from "./note";

export default function NoteEditable({ note }: any) {
    const updateNote = async ({ title, content}: NoteEventProps) => {
        await pocketBase.collection('notes').update(note.id, { title, content })
    }

    return (
        <Note note={note} onUpdate={updateNote} />
    )
}