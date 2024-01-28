import Image from "next/image";
import { Container } from "@/component/ui/Container";
import { FcGoogle } from "react-icons/fc";
import hearts from "@/assets/hearts.png";
import { UserAuth } from "@/context/AuthContext";

export const Header = () => {
    const { user, googleSignIn, logOut } = UserAuth();

    const handleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container className="container mx-auto flex flex-col">
                <div className="flex">
                    <div className="ml-28 mt-40">
                        <h1 className="font-montserrat font-semibold text-[95px] bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">
                            Confession Wall
                        </h1>
                        <p className="font-montserrat font-regular text-white text-lg">
                            Start sending anonymous messages now and discover the freedom of valentine{" "}
                        </p>
                        <button
                            className="font-montserrat font-semibold text-white text-md border-2 border-slate-600 bg-transparent px-4 py-3 rounded-md mt-7 flex items-center"
                            onClick={handleSignIn}
                        >
                            <FcGoogle className="mr-3" />
                            Sign in with Google
                        </button>
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
}