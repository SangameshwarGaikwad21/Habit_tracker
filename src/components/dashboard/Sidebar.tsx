"use client";



export function Sidebar() {
    return (
        <aside className="w-64 border-r p-4">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <nav>
                <ul>
                    <li><a href="/habits" className="block py-2">Habits</a></li>
                    <li><a href="/progress" className="block py-2">Progress</a></li>
                </ul>
            </nav>
        </aside>
    );
}