import Image from "next/image";
import { SettingsIcon } from "lucide-react";

export default function Home() {
  return (
    <main>
      <header className="flex justify-between fixed top-0 text-white w-full p-5">
        <div className="relative aspect-square w-10 rounded-full">
          <Image
            className="rounded-full"
            src="https://staticg.sportskeeda.com/editor/2022/03/b99c3-16467631610344-1920.jpg?w=640"
            layout="fill"
            objectFit="cover"
            alt="profile-image"
          />
        </div>

        <SettingsIcon
          size={40}
          className="p-2 rounded-full cursor-pointer bg-blue-600 text-white transition-all ease-in-out duration-150 hover:bg-blue-700/80"
        />
      </header>
    </main>
  );
}
