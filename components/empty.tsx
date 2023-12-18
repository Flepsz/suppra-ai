import Image from "next/image";

interface EmptyProps {
	label: string;
}

export function Empty({ label }: EmptyProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full p-20">
			<div className="relative w-[21rem] h-72">
				<Image alt="Empty" fill src="/empty.png" />
			</div>
			<p className="text-sm text-center text-muted-foregroundt">{label}</p>
		</div>
	);
}
