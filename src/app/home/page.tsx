import Image from "next/image";
import { Container } from "@/component/ui/Container";
import hearts from "@/assets/hearts.png";
import { Separator } from '@/component/ui/Separator'

export default function Home() {
  return (
    <main>
       <Container className="container mx-auto flex flex-col">
        <div className="flex">
          <div className="ml-12 mt-40">
            <h1 className="font-montserrat font-semibold text-[100px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
              Confession Wall
            </h1>
            <textarea 
            placeholder="Start putting messages here"
            className="border-2 border-gray-700 bg-[#1a1a1a] font-montserrat font-regular text-white min-w-[810px] h-[150px] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-300"></textarea>
          </div>
          <div className="p-28">
            <div className="w-[400px] h-[400px]">
              <Image src={hearts} alt="hearts" layout="responsive" />
            </div>
          </div>
        </div>
      </Container>
      <Separator/>
    </main>
  );
}
