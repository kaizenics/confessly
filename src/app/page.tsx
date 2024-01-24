import Image from 'next/image';
import { Container } from '@/component/ui/Container';
import patterns from "@/assets/patterns.svg";

export default function Home() {
  return (
   <Container className="container mx-auto flex flex-col">
    <main>
    <Image src={patterns} alt="Confessly" layout="fill" objectFit="cover" style={{ opacity: 1 }} />
    <h1 className="font-montse">Confession Wall</h1>
    </main>
    </Container>
  );
}
