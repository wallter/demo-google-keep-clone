'use client';

import { useEffect, useState } from "react";
import NoteEditable from "./(note)/note-editable"
import NoteNew from "./(note)/note-new"
import { NoteEventProps } from "./(note)/note";

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

const getNotes = async () => {
	// Nextjs#13 components are SSR and if you don't use `fetch()` there are fancy exports to do so let's just ...
	// import pocketBase from "../(pocketbase)/pocketbase"
	// const res = await pocketBase.collection('notes').getList(1, 30)
	// return res.items ?? []

	const res = await fetch(
		'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=50&sort=sort,-updated', 
		{ cache: "no-store" }
	)
	const data = await res.json()
	
	return data.items ?? []
}

export default function NotesPage() {
	const [notes, setNotes] = useState([])	

	const refreshNotes = () => getNotes().then(setNotes)

	useEffect(() => {
		// Fetch the initial list of notes when the component mounts
		refreshNotes()
	}, []);

	const handleNoteCreated = async () => {
		refreshNotes()
	}

	return (
		<div className="w-full flex flex-col">
			<div className="flex justify-center items-center py-5 px-2">
				<NoteNew onCreate={handleNoteCreated} />
			</div>
			<div className="w-full py-5 px-2 columns-1 md:columns-2 xl:columns-4 2xl:columns-6">
			{/* <div className="w-full py-5 px-2 columns-1 md:columns-2 xl:columns-4 2xl:columns-6"> */}
				{notes.map((note: any) => <NoteEditable key={note.id} note={note} />)}
			</div>
		</div>
	)
}