import React, { useEffect, useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }, [task])


  const submitHandler = (e) => {
    e.preventDefault();
    const copyTask = [...task]
    copyTask.push({ title, description })
    setTask(copyTask)

    setTitle('')
    setDescription('')
  }

  const deleteTask = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask)
  }

  return (
    <>

      <div className='bg-black h-screen w-full flex  text-white '>

        <div className=' h-full w-1/2 placeholder:text-gray-400 p-7'>

          <form onSubmit={(e) => {
            submitHandler(e)
          }} >

            <h1 className='text-4xl p-4'>
              Add Notes
            </h1>

            <input onChange={(elem) => {
              setTitle(elem.target.value);
            }}
              value={title}
              className='text-white border-2 border-white w-full p-3 mt-5 rounded-sm '
              type="text" placeholder='Enter Notes Heading' />

            <textarea value={description}
              onChange={(elem) => {
                setDescription(elem.target.value);
              }}

              className='border-2 border-white w-full p-3 mt-5 rounded-sm '
              placeholder='Write Details here ....' rows={10}>
            </textarea>

            <button className=' text-black bg-white font-semibold text-lg w-full py-1 border-2 border-white mt-5 rounded-sm active:scale-95' >
              Add Note
            </button>

          </form>

        </div>

        <div className=' border-l-white border-l-2 h-full w-1/2 p-7 '>

          <h1 className='text-4xl p-4' >
            Recent Notes
          </h1>

          <div className='flex mt-5 flex-wrap gap-5'>

            {task.map((elem, idx) => {
              return <div key={idx}
                className=' flex flex-col justify-between h-65 w-55 p-6 bg-white rounded-lg text-black overflow-y-auto wrap-break-word relative bg-[url(/notes.png)] bg-size-[140%] bg-center'>
                <div>
                  <h1 className='font-bold text-xl'>
                    {elem.title}
                  </h1>
                  <p>
                    {elem.description}
                  </p>
                </div>
                <button onClick={() => {
                  deleteTask(idx);
                }}
                  className='bg-red-500 rounded-sm w-40 active:scale-95 text-white font-semibold'>
                  Delete Note
                </button>

              </div>
            })}
          </div>

        </div>

      </div>

    </>
  )
}

export default App