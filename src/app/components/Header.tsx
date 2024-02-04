import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Container } from "~/app/components/ui/Container";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "sonner";
import { IoMdSettings } from "react-icons/io";
import hearts from "~/assets/hearts.png";

import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "~/context/AuthContext";
import { db } from "~/app/firebase";

export const Header = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [message, setMessage] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const handleToggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const handleSignIn = async () => {
    try {
      toast.info("Signing in...");
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      toast.success("Successfully logged out");
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostMessage = async () => {
    if (message.trim() === "") {
      toast.warning("Please enter a message");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name: user.displayName,
        text: message,
        date: new Date().toLocaleDateString(),
        userId: user.uid,
      });
      toast.success("Successfully posted message");
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container className="container mx-auto">
        <Toaster richColors position="bottom-center" />
        <main className="flex justify-center items-center flex-row mt-32 sm:mt-28 sm:mb-14 ">
          <div className="top-8 -z-10 absolute sm:hidden">
            <Image
              src={hearts}
              alt="hearts"
              width={90}
              height={90}
              layout="fixed"
            />
          </div>
          <div className="relative sm:mr-8">
            {!user ? (
              <div>
                <h1
                  onClick={() => router.push("/")}
                  className="font-montserrat font-semibold text-center sm:text-left text-[10vw] sm:text-[5vw] md:text-[5vw] lg:text-[5.5vw] xl:text-[80px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent cursor-pointer"
                >
                  Confession Wall
                </h1>
                <p className="font-montserrat font-regular text-center sm:text-left text-white text-[4vw] sm:text-[16px] md:text-[18px] lg:text-lg xl:text-lg">
                  Sign in with your Google account to start sending messages
                  anonymously
                </p>
                <div className="flex justify-center sm:justify-normal">
                  <button
                    className="font-montserrat font-semibold text-white text-md text-md border-2 border-slate-600 bg-transparent rounded-md px-4 py-3 mt-7 flex items-center"
                    onClick={handleSignIn}
                  >
                    <FcGoogle className="mr-3" />
                    Sign in with Google
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-montserrat text-white text-center sm:text-start text-[4vw] sm:text-sm lg:text-xl">
                  Welcome, {user.displayName}!
                </p>
                <h1 className="font-montserrat font-semibold text-center sm:text-left text-[10vw] sm:text-[5vw] md:text-[5vw] lg:text-[5.5vw] xl:text-[80px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent cursor-pointer">
                  Confession Wall
                </h1>
                <div className="flex justify-center sm:justify-normal">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Start putting messages here"
                    className="xl:m-0 bg-gray-900 font-montserrat font-regular text-white w-[100%] h-[130px] sm:h-[100px] rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-slate-600 resize-none"
                  />
                </div>
                <div className="flex flex-wrap justify-center sm:justify-normal relative">
                  <button
                    onClick={handlePostMessage}
                    className="font-montserrat text-sm font-semibold text-white bg-gradient-to-t from-red-400 to-red-400 px-3 py- rounded-md mt-2 mr-2 flex items-center hover:bg-gradient-to-b from-red-500 to-red-500"
                  >
                    Save Message
                  </button>
                  <button
                    onClick={() => toast.info("Live chat feature coming soon")}
                    className="font-montserrat font-semibold text-white text-sm border border-slate-600 bg-transparent px-4 py-3 rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-slate-800"
                  >
                    Live Chat
                  </button>
                  <button
                    className="font-montserrat text-sm font-semibold text-white border border-slate-600 px-3 py- rounded-md mt-2 mr-2 flex items-center hover:text-gray-400 hover:border-slate-800"
                    onClick={handleToggleDropdown}
                  >
                    <IoMdSettings className="w-[20px] h-[20px]" />
                  </button>
                </div>
                <div
                    className={`absolute left-[130px] md:left-[240px] mt-2 w-40 bg-gray-900 rounded-md overflow-hidden shadow-xl z-10 ${
                      isDropdownVisible ? "block" : "hidden"
                    }`}
                  >
                    <div className="my-2">
                      <p
                        onClick={() => router.push("/")}
                        className="font-montserrat font-semibold text-white text-sm bg-transparent px-4 py-3 flex items-center hover:text-gray-400 hover:border-slate-800 cursor-pointer"
                      >
                        All Messages
                      </p>
                      <p
                        onClick={() => router.push("/messages")}
                        className="font-montserrat font-semibold text-white text-sm bg-transparent px-4 py-3 flex items-center hover:text-gray-400 hover:border-slate-800 cursor-pointer"
                      >
                        My messages
                      </p>
                      <p
                        className="font-montserrat text-sm font-semibold text-red-500 text-md bg-transparent px-4 py-3 flex items-center hover:text-red-900 hover:border-red-900 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Log out
                      </p>
                    </div>
                  </div>
              </div>
            )}
          </div>
          <div className=" -z-10 hidden sm:flex">
            <Image
              src={hearts}
              alt="hearts"
              width={370}
              height={370}
              layout="fixed"
            />
          </div>
        </main>
      </Container>
    </div>
  );
};
