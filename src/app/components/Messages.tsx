"use client";

import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { IoMdClose } from "react-icons/io";

import { db } from "~/app/firebase";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";

type Messages = {
  id: string;
  text: string; 
  date: string;
  name: string;
};

export const Messages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [msgs, setMsgs] = useState<Messages[]>([]);

  const handleReadMore = (message: string) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage("");
    setShowModal(false);
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("date", "asc"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMsgs(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Messages[]
      );
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Container className="max-w-7xl xl:px-14 container flex justify-center items-center">
        <div className="flex flex-col justify-between items-center my-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {msgs.map((message) => (
              <div
                key={message.id}
                className="w-[100%] h-[180px] sm:h-[280px] mb-4 sm:mb-1 box-border border-2 border-slate-600 bg-gray-900 flex flex-col justify-between items-center rounded-md"
              >
                <p className="max-w-prose line-clamp-6 font-montserrat font-regular text-md text-white py-5 px-5">
                  {message.text}
                </p>
                <div className="w-full">
                  <div className="flex border-t-2 justify-between border-slate-600 ">
                    <button
                      className="font-montserrat font-semibold text-sm sm:text-md text-red-400 hover:text-red-500 py-3 px-3  cursor-pointer"
                      onClick={() => handleReadMore(message.text)}
                    >
                      Read more
                    </button>
                    <p className=" font-montserrat font-regular text-md text-white text-right py-3 px-5">
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