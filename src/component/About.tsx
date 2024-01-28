"use client";

import { Container } from "@/component/ui/Container";
import { Separator } from "@/component/ui/Separator";
import { IoArrowForward } from "react-icons/io5";

interface AboutProps {
  id: string;
}

export const About: React.FC<AboutProps> = ({ id }) => {
 

  return (
   
    <section id={id} className="mt-[35%] mb-24"  data-aos="fade-up">
      <Separator/>
      <Container className="container flex flex-col">
      <div className="grid lg:grid-cols-2 gap-0 py-14 mx-auto mt-10"
      data-aos="fade-up"
      >
          <div className="mb-14 m-0">
            <h3 className="font-montserrat font-semibold text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-3xl mb-8">
              <span className="bg-[#960202] p-2 rounded-xl">about</span>
            </h3>
            <p className="font-montserrat font-regular text-md sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl  text-left">
              The{" "}
              <span className="font-semibold">
                HCDC Information Technology Society
              </span>{" "}
              is a student organization that aims to promote the field of
              Information Technology to the students of Holy Cross of Davao
              College.
            </p>
            <div className="flex items-center underline">
              <button className="font-montserrat sm:text-[20px] md:text-[25px] lg:text-3xl transition-opacity duration-300 ease-in-out hover:opacity-70 mt-14">
                Our Story
              </button>
              <IoArrowForward className="w-8 h-8 ml-2 mt-14" />
            </div>
        </div>

          <div className="m-0 lg:ml-10 xl:ml-10">
            <h3 className="font-montserrat font-semibold text-2xl lg:text-4xl xl:text-3xl mb-8">
              <span className="bg-[#960202] p-2 rounded-xl">mission</span>
            </h3>
            <p className="font-montserrat font-regular text-md sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl text-left">
              To provide opportunities for students to enhance their IT skills,
              knowledge, and professional development through various
              activities and initiatives.
            </p>
          </div>

      </div>
      </Container>
    </section>
  );
};