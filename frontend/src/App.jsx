import React from 'react'

const App = () => {



  return (
    <div className='w-full h-screen bg-neutral-900 text-white overflow-x-hidden'>
      <div className='container mx-auto max-w-3xl pb-44'>
        {/* user message */}
          <div className='my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit'>
            Hi,how are you?
          </div>
          {/* assistant message */}
          <div className='max-w-fit'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, temporibus, eligendi sapiente a dolorum velit ut, ad vel laboriosam modi nulla culpa! Optio odit aliquid illo, nisi enim voluptatem alias.
          </div>

          
          {/* text area wrapper */}
         <div className='fixed inset-x-0 bottom-0 flex justify-center items-center bg-neutral-900'>
           <div className='bg-neutral-800 p-2 rounded-3xl w-full max-w-3xl mb-3'>
            <textarea className='w-full resize-none outline-0 p-3' rows={2}placeholder='ASK Something...'></textarea>
            <div className='flex justify-end items-center'>
              <img className='rounded-full cursor-pointer bg-gray-200 p-2 hover:bg-gray-500  w-10 h-10 ' src="https://ik.imagekit.io/qvwd13gwe/Icon's/arrow-up-line.svg" alt="" />
            </div>
          </div>
         </div>
      </div>
    </div>
  )
}

export default App