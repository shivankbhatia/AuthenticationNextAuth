'use client';

export default function DarkModeToggle() {
    return (
        <button
            className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded"
            onClick={() => {
                document.documentElement.classList.toggle('dark');
            }}
        >
            Toggle Dark Mode
        </button>
    );
}
