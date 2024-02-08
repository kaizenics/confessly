"use client";

import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { Footer } from "~/app/components/Footer";
import { Header } from "~/app/components/Header";
import { IoMdClose } from "react-icons/io";
import { Toaster, toast } from "sonner";
import MoonLoader from "react-spinners/MoonLoader";

import { db, updateDoc } from "~/app/firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  doc,
  deleteDoc,
  orderBy
} from "firebase/firestore";
import { UserAuth } from "~/context/AuthContext";

type Message = {
  id: string;
  text: string;
  time: string;
  date: string;
};

export default function MyMessages() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { user } = UserAuth();
  const [mymsgs, setMyMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const handleReadMore = (message: Message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
    setShowModal(false);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      toast.success("Successfully deleted message");
      await deleteDoc(doc(db, "messages", id));
    } catch (error) {
      console.error("Error deleting message: ", error);
    }
  };

  const handleSaveMessage = async () => {
    if (selectedMessage) {
      try {
        await updateDoc(doc(db, "messages", selectedMessage.id), {
          text: selectedMessage.text,
        });
        toast.success("Successfully updated message");
        handleCloseModal();
      } catch (error) {
        console.error("Error updating message: ", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "messages"),
        where("userId", "==", user.uid),
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMyMsgs(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as Message)
          )
        );
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <main>
      <Header />
      <Toaster richColors position="bottom-center" />
      <Container className="max-w-7xl container flex justify-center items-center">
        {!user ? (
          <div className="text-center my-14 font-montserrat font-semibold text-md text-white">
            Please Sign-in to view the My messages page
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center mt-24 sm:mt-14">
            <MoonLoader color="#ffffff" loading={loading} size={100} />
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center my-14">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {mymsgs.reverse().map((message) => (
                <div
                  key={message.id}
                  className="w-[100%] h-[180px] sm:h-[280px] mb-1 box-border border border-slate-600 bg-gray-900 flex flex-col justify-between items-center rounded-md"
                >
                  <p className="w-full max-w-prose line-clamp-3 sm:line-clamp-6 font-montserrat font-regular text-md text-center text-white py-5 px-5">
                    {message.text}
                  </p>

                  <div className="w-full flex border-t mx-20 sm:mx-28 justify-between border-slate-600">
                    <button
                      className="font-montserrat font-semibold text-sm sm:text-md text-white hover:text-gray-300 py-3 px-3 cursor-pointer"
                      onClick={() => handleReadMore(message)}
                    >
                      Edit
                    </button>
                    <button
                      className="font-montserrat font-regular text-md text-red-400 hover:text-red-500  text-right py-3 px-5 cursor-pointer"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>

      {showModal && selectedMessage && (
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
            <textarea
              className="w-[100%] h-[250px] my-4 resize-none font-montserrat font-regular outline-none border-none text-lg bg-transparent text-white"
              value={selectedMessage.text}
              onChange={(e) =>
                setSelectedMessage({ ...selectedMessage, text: e.target.value })
              }
            />
            <button
              className="font-montserrat font-semibold text-white border-2 border-emerald-600 bg-transparent px-3 py-2 rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-green-800"
              onClick={handleSaveMessage}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
