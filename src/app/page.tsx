import Image from "next/image";
import { Container } from "@/component/ui/Container";
import gradient from "@/assets/gradient.jpg";

export default function Home() {
  return (
    <Container className="container mx-auto flex flex-col">
      <main>
      
          <div className="mt-20 mx-36">
            <h1 className="font-montserrat font-semibold text-center text-[120px] bg-gradient-to-r from-pink-300 to-pink-500 bg-clip-text text-transparent">
              Confession Wall
            </h1>
            <p className="font-montserrat font-regular text-white text-center text-2xl">Start sending anonymous messages now and discover the freedom of valentine </p>
          </div>
          
      </main>
    </Container>
  );
}
