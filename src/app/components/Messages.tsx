

import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { IoMdClose } from "react-icons/io";

import { db } from "~/app/firebase";
import { onSnapshot, collection } from "firebase/firestore";

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
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMsgs(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Messages[]
      );
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Container className="container flex justify-center items-center px-6 xl:px-0">
        <div className="flex flex-col md:block lg:flex-row xl:flex-row justify-between items-center my-10">
          <div className="lg:mx-24 xl:mx-7 grid grid-cols-4 gap-5">
            {msgs.map((message) => (
              <div
                key={message.id}
                className="w-[360px] h-[280px] box-border border-2 border-slate-600 bg-gray-900 flex flex-col justify-between items-center rounded-md"
              >
                <p className="max-w-prose line-clamp-6 font-montserrat font-regular text-md text-white py-5 px-5">
                  {message.text}
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