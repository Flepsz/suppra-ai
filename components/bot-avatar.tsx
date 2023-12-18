import { Avatar, AvatarImage } from "./ui/avatar";

export default function BotAvatar() {
  return (
    <Avatar className="w-8 h-8 rounded-full">
      <AvatarImage className="rounded-full" src="/bot_img.jpg" />
    </Avatar>
  )
}
