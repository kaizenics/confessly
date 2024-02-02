import { Container } from "~/app/components/ui/Container";

export const Footer = () => {
  return (
    <>
      <section className="mt-20">
        <Container className="max-w-7xl container mx-auto ">
          <footer className="mt-3 flex justify-between items-center">
            <p className="font-montserrat text-[12px] sm:text-sm md:text-xl mb-20 items-start text-[#a7a7a7dc] inline-block  whitespace-nowrap">
              Niko Soriano © 2024 - All Rights Reserved
            </p>
          </footer>
        </Container>
      </section>
    </>
  );
};
