import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { FcGoogle } from "react-icons/fc";
import hearts from "~/assets/hearts.png";

import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "~/context/AuthContext";
import { db } from "~/app/firebase";

export const Header = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      alert("You have been logged out");
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostMessage = async () => {
    if (message.trim() === "") {
      alert("Please enter a message");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name: user.displayName,
        text: message,
        date: new Date().toLocaleDateString(),
        userId: user.uid,
      });
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container className="container mx-auto flex flex-col">
        <div className="flex">
          <div className="ml-28 mt-40">
            {!user ? (
              <div>
                <h1
                  onClick={() => router.push("/")}
                  className="font-montserrat font-semibold text-[95px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent cursor-pointer"
                >
                  Confession Wall
                </h1>
                <p className="font-montserrat font-regular text-white text-xl">
                  Sign in with your HCDC account to start sending messages anonymously
                </p>
                <button
                  className="font-montserrat font-semibold text-white text-md border-2 border-slate-600 bg-transparent px-4 py-3 rounded-md mt-7 flex items-center"
                  onClick={handleSignIn}
                >
                  <FcGoogle className="mr-3" />
                  Sign in with Google
                </button>
              </div>
            ) : (
              <div>
                <p className="font-montserrat text-white text-2xl">
                  Welcome, {user.displayName}!
                </p>
                <h1 className="font-montserrat font-semibold text-[95px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
                  Confession Wall
                </h1>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Start putting messages here"
                  className="border-2 border-slate-600 bg-gray-900 font-montserrat font-regular  text-white w-[810px] h-[100px] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-red-300 resize-none"
                />
                <div className="flex">
                  <button
                    onClick={handlePostMessage}
                    className="font-montserrat font-semibold text-white text-md border-2 border-slate-600  bg-transparent px-4 py-3 rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-slate-800"
                  >
                    Post your message
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="font-montserrat font-semibold text-white text-md border-2 border-slate-600 bg-transparent px-4 py-3 rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-slate-800"
                  >
                    All
                  </button>
                  <button
                    onClick={() => router.push("/messages")}
                    className="font-montserrat font-semibold text-white text-md border-2 border-slate-600 bg-transparent px-4 py-3 rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-slate-800"
                  >
                    My messages
                  </button>
                  <button
                    className="font-montserrat font-semibold text-red-500 text-md border-2 border-red-500 bg-transparent px-4 py-3 rounded-md mt-2 flex items-center hover:text-red-900 hover:border-red-900"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="p-28">
            <div className="w-[400px] h-[400px]">
              <Image src={hearts} alt="hearts" layout="responsive" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
