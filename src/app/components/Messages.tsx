import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { IoMdClose } from "react-icons/io";
import MoonLoader from "react-spinners/MoonLoader";

import { db } from "~/app/firebase";
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";

type Messages = {
  id: string;
  text: string;
  time: string;
  date: string;
  timestamp: string;
  name: string;
};

export const Messages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [msgs, setMsgs] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState<Messages[]>([]);

  const handleReadMore = (message: string) => {
    setSelectedMessage(message); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage("");
    setShowModal(false);
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Messages[];

      const userMessageIndex = newMessages.findIndex(message => message.name === "user");

      if (userMessageIndex !== -1) {
        newMessages.splice(userMessageIndex, 1);

        newMessages.unshift(newMessages[userMessageIndex]);
      }

      setMsgs(newMessages);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDisplayedMessages(msgs);
  }, [msgs]);

  return (
    <>
      <Container className="max-w-7xl xl:px-14 container flex justify-center items-center">
        {loading ? (
          <div className="flex justify-center items-center mt-24 sm:mt-14">
            <MoonLoader color="#ffffff" loading={loading} size={100} />
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center my-14">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {displayedMessages.map((message) => (
                  <div
                    key={message.id}
                    className="w-full h-[180px] sm:h-[280px] mb-1 box-border border border-slate-600 bg-gray-900 flex flex-col justify-between items-center rounded-md"
                  >
                    <p className="w-full max-w-prose line-clamp-3 sm:line-clamp-6 font-montserrat font-regular text-center text-md text-white py-5 px-5">
                      {message.text}
                    </p>

                    <div className="w-full flex border-t justify-between mx-20 sm:mx-40 border-slate-600">
                      <button
                        className="font-montserrat font-semibold text-sm sm:text-md text-red-400 hover:text-red-500 py-3 px-3 cursor-pointer"
                        onClick={() => handleReadMore(message.text)}
                      >
                        Read more
                      </button>
                      <p className="font-montserrat font-regular text-sm sm:text-md text-white py-3 px-3">
                        {message.date}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
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
