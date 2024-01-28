import { Container } from "@/component/ui/Container";

const messages = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
                    <p className="font-montserrat font-semibold text-md text-white text-right py-3 px-5">
                      Read more
                    </p>
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
        </>
    );
};

            
      