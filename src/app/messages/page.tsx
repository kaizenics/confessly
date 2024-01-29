"use client";

import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { Header } from "~/app/components/Header";
import { IoMdClose } from "react-icons/io";

import { db } from "~/app/firebase";
import { onSnapshot, collection, query, where} from "firebase/firestore";
import { UserAuth } from "~/context/AuthContext";

type Message = {
    id: string;
    text: string;
    date: string;
  };

export default function MyMessages() {
const [showModal, setShowModal] = useState(false);
const [selectedMessage, setSelectedMessage] = useState("");
const { user } = UserAuth();
const [mymsgs, setMyMsgs] = useState<Message[]>([]);

const handleReadMore = (message: string) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage("");
    setShowModal(false);
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "messages"), where("userId", "==", user.uid));
  
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMyMsgs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }) as Message)
        );
      });
  
      return () => unsubscribe();
    }
  }, [user]);


  return (
    <main>
        <Header />
      <Container className="container flex justify-center items-center px-6 xl:px-0">
        <div className="flex flex-col md:block lg:flex-row xl:flex-row justify-between items-center my-10">
          <div className="lg:mx-24 xl:mx-7 grid grid-cols-4 gap-5">
            {mymsgs.map((message) => (
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
    
    </main>
  );
}   