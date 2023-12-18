import Image from "next/image";

export default function Loader() {
  return (
    <div className="flex flex-col items-center h-full gap-y-4">
      <div className="relative w-20 h-20 animate-spin">
        <Image
          alt="loading_logo"
          fill
          src="/loader.png"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Suppra AI is thinking...
      </p>
    </div>
  )
}
