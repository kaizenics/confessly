import { Container } from "~/app/components/ui/Container";

export const Footer = () => {
  return (
    <>
      <section className="mt-24">
        <Container className="container mx-auto ">
          <div className="w-[100%] h-[1.5px] bg-slate-600">
            <div className="px-2" />
          </div>
          <footer className="mt-3">
            <div className="flex justify-between items-center">
              <p className="font-montserrat text-[8px] sm:text-sm md:text-md mb-20 items-start text-[#dfdfdfdc] inline-block  whitespace-nowrap">
                Niko Soriano © 2024 All Rights Reserved
              </p>
              <div className="flex font-montserrat text-[8px] sm:text-sm md:text-md items-start text-[#dfdfdfdc] mb-20 whitespace-nowrap">
                <a
                  href="https://github.com/kaizenics/confessly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-semibold hover:text-white hover:underline">
                    Contribute
                  </p>
                </a>
                <a
                  href="https://github.com/kaizenics/confessly/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="pl-4 font-semibold hover:text-white hover:underline">
                    Report a bug
                  </p>
                </a>
              </div>
            </div>
          </footer>
        </Container>
      </section>
    </>
  );
};
