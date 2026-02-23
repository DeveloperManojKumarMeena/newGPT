import React, { useState } from "react";

const App = () => {
  const [messages, setmessages] = useState([
    {
      message: "Hello AI",
      role: "user",
      time: "06:12",

    },
    {
      message: "Hello i am assistent how can help you today!",
      role: "model",
      time: "06:15",

    },
  ]);
  const [input, setinput] = useState();

  const ChangeHandler = (e) => {
    setinput(e.target.value);
  };

  const submitHandler = () => {
    console.log(input);
    if (input === '') {
      return
    }

    let d = new Date();

    let timestamp = d.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const usemessage = {
      message: input.trim(),
      role: "user",
      time: timestamp
    };



    setmessages((e) => [...e, usemessage]);
    setinput("");
  };

  return (
    <div className="w-full h-screen bg-neutral-900 text-white overflow-x-hidden">
      <div className="container mx-auto max-w-3xl pb-44">
        {/* user message */}

        {/* assistant message */}
      
        {messages.map((e, i) => {
          if (e.role === "user") {
            return (
              <div
                key={i}
                className="my-6 pb-0 bg-neutral-800 p-2 rounded-xl ml-auto max-w-fit flex flex-col justify-start items-end"
              >
                {e.message}
                <small className="text-[10px] text-gray-500 ">{e.time}</small>
              </div>
            );
          } else {
            return (
              <div key={i} className="max-w-fit  flex flex-col justify-start items-start">
                {e.message}
                <small className="text-[10px] text-gray-500 ">{e.time}</small>
              </div>
            );
          }
        })}

        {/* text area wrapper */}
        <div className="fixed inset-x-0 bottom-0 flex justify-center items-center bg-neutral-900">
          <div className="bg-neutral-800 p-2 rounded-3xl w-full max-w-3xl mb-3">
            <textarea
              onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
              value={input}
              onChange={(e) => ChangeHandler(e)}
              className="w-full resize-none outline-0 p-3"
              rows={2}
              placeholder="ASK Something..."
            ></textarea>
            <div className="flex justify-end items-center">
              <img
                onClick={submitHandler}
                className="rounded-full cursor-pointer bg-gray-200 p-2 hover:bg-gray-500  w-10 h-10 "
                src="https://ik.imagekit.io/qvwd13gwe/Icon's/arrow-up-line.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
