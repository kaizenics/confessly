"use client"

import { useState } from "react";
import { Container } from "~/app/components/ui/Container";
import { IoMdClose } from "react-icons/io";

const messages = [
  {
    text: "This is a message",
    date: "2021-10-10",
  },
  {
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    date: "2021-10-10",
  },
  {
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over",
    date: "2021-10-10",
  },
  {
    text: "huh",
    date: "2021-10-10",
  },
  {
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over",
    date: "2021-10-10",
  },
  {
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over, Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over",
    date: "2021-10-10",
  },
];

export const Messages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const handleReadMore = (message: string) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage("");
    setShowModal(false);
  };
  return (
    <>
      <Container className="container flex justify-center items-center px-6 xl:px-0">
        <div className="flex flex-col md:block lg:flex-row xl:flex-row justify-between items-center my-10">
          <div className="lg:mx-24 xl:mx-7 grid grid-cols-4 gap-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className="box-border border-2 border-slate-600 bg-gray-900 flex flex-col justify-between items-center rounded-md"
              >
                <p className="min-h-[230px] font-montserrat font-regular text-md text-white py-5 px-5">
                  {message.text.length > 255
                    ? `${message.text.substring(0, 255)}...`
                    : message.text}
                </p>
                <div className="w-full">
                  <div className="flex border-t-2 justify-between border-slate-600">
                    <button
                      className="font-montserrat font-semibold text-md text-red-400 hover:text-red-500 text-right py-3 px-5 cursor-pointer"
                      onClick={() => handleReadMore(message.text)}
                    >
                      Read more
                    </button>
                    <p className="font-montserrat font-regular text-md text-white text-right py-3 px-5">
                      {message.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-[700px] bg-slate-800 p-6 rounded-md inset-0">
            <div className="flex justify-end">
              <button
                className="mb-4 px-1 py-1 border-2 border-gray-500 text-white rounded-md"
                onClick={() => handleCloseModal()}
              >
                <IoMdClose className="w-[20px] h-[20px]" />
              </button>
            </div>
            <p className="font-montserrat font-regular text-lg text-white">
              {selectedMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
