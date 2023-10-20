'use client';

import { useState } from "react";
import NotesPage from "./notes/page";

export default function HomePage() {
	const [darkMode, setDarkMode] = useState(false)

	return (
		<main className={`flex min-h-screen flex-col items-center py-20 pt-5 ${darkMode ? 'dark' : ''}`}>
			<div className="px-10 w-full flex justify-end">
				<label className="relative inline-flex items-center cursor-pointer">
					<input type="checkbox" value="" className="sr-only peer" onChange={() => setDarkMode(!darkMode)} />
					<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 light:peer-focus:ring-red-800 light:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
					<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
						{darkMode ? 'Dark' : 'Light'} Mode
					</span>
				</label>
			</div>
			<h1 className="text-6xl">Note App</h1>
			<h2 className="text-xl text-gray-500">
				By {' '}
				<a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://www.linkedin.com/in/tylerrwall/" target="_blank">Tyler Wall</a>
			</h2>
			<NotesPage />
		</main>
	)
}
