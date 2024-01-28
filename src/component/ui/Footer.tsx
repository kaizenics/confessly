
import { Container } from "@/component/ui/Container";

export const Footer = () => {   
    return (
        <>
        <section className="mt-24">
        <Container className="container mx-auto">
          <div className="w-[100%] h-[1.5px] bg-slate-600">
            <div className="px-2" />
          </div>
          <footer>
            <div className="flex justify-between items-center">
              <p className="font-montserrat text-md mt-5 mb-20 items-start text-[#dfdfdfdc] inline-block  whitespace-nowrap">
                Niko Soriano © 2024 All Rights Reserved
              </p>
              <div className="flex font-montserrat text-md items-start text-[#dfdfdfdc] mb-20 whitespace-nowrap">
               <a href="https://github.com/kaizenics/confessly" target="_blank" rel="noopener noreferrer">
                <p className="pr-2 font-semibold hover:text-white hover:underline">Contribute</p>
                </a>
                <a href="https://github.com/kaizenics/confessly/issues/new" target="_blank" rel="noopener noreferrer">
                <p className="pl-2 font-semibold hover:text-white hover:underline">Report a bug</p>
                </a>
              </div>
            </div>
          </footer>
        </Container>
      </section>
        </>
    );
}