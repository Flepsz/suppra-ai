"use client";

import { cn } from "@/lib/utils";
import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music,
	Settings,
	VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-sky-500",
	},
	{
		label: "Conversation",
		icon: MessageSquare,
		href: "/conversation",
		color: "text-violet-500",
	},
	{
		label: "Image Generation",
		icon: ImageIcon,
		href: "/image",
		color: "text-pink-700",
	},
	{
		label: "Video Generation",
		icon: VideoIcon,
		href: "/video",
		color: "text-orange-700",
	},
	{
		label: "Music Generation",
		icon: Music,
		href: "/music",
		color: "text-emerald-500",
	},
	{
		label: "Code Generation",
		icon: Code,
		href: "/code",
		color: "text-green-700",
	},
	{
		label: "Settings",
		icon: Settings,
		href: "/settings",
	},
];

export default function Sidebar() {
	const pathname = usePathname();
	return (
		<div className="flex flex-col h-full py-4 space-y-4 bg-[#111827] text-white">
			<div className="flex-1 px-3 py-2">
				<Link href="/dashboard" className="flex items-center pl-3 mb-10">
					<div className="relative mx-auto h-9 w-28">
						<Image fill alt="Logo" src="/logo.png" />
					</div>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							href={route.href}
							key={route.href}
							className={cn(
								"flex justify-start w-full p-3 text-sm font-medium transition rounded-lg cursor-pointer group hover:text-white hover:bg-white/10",
								pathname === route.href
									? "text-white bg-white/10"
									: "text-zinc-400"
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
