export default function Date({ date }: { date: string }): React.ReactNode {
    return (
        <span className="bg-gray-100 dark:bg-gray-500 text-gray-700 dark:text-zinc-800 bg-opacity-75 rounded-full px-3 py-1 text-xs text-opacity-75 font-semibold mr-2 mb-2">
            {date}
        </span>
    )
}