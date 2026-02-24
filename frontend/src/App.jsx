import React, { useState } from "react";
import axios from 'axios'

const App = () => {
  const [messages, setmessages] = useState([
    
  ]);
  const [input, setinput] = useState();

  const ChangeHandler = (e) => {
    setinput(e.target.value);
  };

  const submitHandler =async () => {
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
    
    const result = await axios.post('http://localhost:3000/ai',{ask:usemessage.message})
    console.log(result.data.responce)
    const modelmessage = {
      message:result.data.responce,
      role:"model",
      time: timestamp
    }
    setmessages((e)=>[...e,modelmessage])

    ;
  };



  return (
    <div className="w-full h-screen bg-neutral-900 text-white overflow-x-hidden">
      <div className="container mx-auto max-w-3xl pb-44">
        {/* user message */}

        {/* assistant message */}
      
    {/* Welcome Screen Logic */}
{messages.length === 0 ? (
  <div className="h-[60vh] flex flex-col justify-center items-center text-center">
    <h1 className="text-4xl font-bold bg-linear-to-r from-gray-700 to-gray-300 bg-clip-text text-transparent">
      Welcome to AI Chat DPT
    </h1>
    <p className="text-gray-400 mt-2">How can I help you today?</p>
  </div>
) : (
  /* अगर मैसेज हैं, तो पुराना map वाला कोड चलेगा */
  messages.map((e, i) => {
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
        <div key={i} className="max-w-fit flex flex-col justify-start items-start my-6 bg-neutral-700 p-2 rounded-xl">
          {e.message}
          <small className="text-[10px] text-gray-400 ">{e.time}</small>
        </div>
      );
    }
  })
)}

        {/* text area wrapper */}
        <div className="fixed inset-x-0 bottom-0 flex justify-center items-center bg-neutral-900">
          <div className="bg-neutral-800 p-2 rounded-3xl w-full max-w-3xl mb-3 flex items-center">
            <textarea
              onKeyUp={(e) => e.key === 'Enter' && submitHandler()}
              value={input}
              onChange={(e) => ChangeHandler(e)}
              className="w-full resize-none outline-0 p-3"
              rows={2}
              placeholder="ASK Something..."
            ></textarea>
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
  );
};

export default App;
