"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: "📄",
  },
  {
    title: "Excel Intelligence",
    href: "/excel",
    icon: "📊",
  },
  {
    title: "Knowledge Base",
    href: "/knowledge",
    icon: "📚",
  },
  {
    title: "AI Chat",
    href: "/chat",
    icon: "🤖",
  },
  {
    title: "SQL Assistant",
    href: "/sql",
    icon: "🗄️",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {

    const pathname = usePathname();

    return (

        <aside className="w-72 h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

            <div className="p-8 border-b border-slate-800">

                <h1 className="text-3xl font-bold text-white">
                    EndurMind
                </h1>

                <p className="text-sm text-slate-400 mt-2">
                    Enterprise AI Copilot
                </p>

            </div>

            <nav className="flex-1 p-5 space-y-2">

                {menu.map((item) => (

                    <Link
                        key={item.href}
                        href={item.href}
                        className={`
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        rounded-xl
                        transition-all

                        ${
                            pathname === item.href
                                ? "bg-blue-600 text-white"
                                : "text-slate-400 hover:bg-slate-900 hover:text-white"
                        }
                        `}
                    >

                        <span className="text-2xl">

                            {item.icon}

                        </span>

                        <span className="font-medium">

                            {item.title}

                        </span>

                    </Link>

                ))}

            </nav>

            <div className="p-6 border-t border-slate-800">

                <div className="bg-slate-900 rounded-xl p-4">

                    <p className="text-sm text-slate-500">

                        Version

                    </p>

                    <p className="text-white font-semibold">

                        EndurMind AI v1.0

                    </p>

                </div>

            </div>

        </aside>

    );

}