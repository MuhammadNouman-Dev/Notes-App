import React, { useEffect, useState } from 'react'

const App = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('') 
  const [task, setTask] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task))
  }, [task])

  const submitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === '' || description.trim() === '') {
      setError('Please enter both Title and Description')
      return;
    }

    setError('')

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
    <div className='bg-black min-h-screen w-full flex flex-col md:flex-row text-white'>

      <div className='w-full md:w-1/2 p-4 md:p-7'>

        <form onSubmit={submitHandler}>

          <h1 className='text-3xl md:text-4xl p-2 md:p-4'>
            Add Notes
          </h1>

          {error && (
            <p className='text-red-500 text-sm mb-2 px-2'>
              {error}
            </p>
          )}

          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className='text-white border-2 border-white w-full p-3 mt-4 rounded-sm'
            type="text"
            placeholder='Enter Notes Heading'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-white w-full p-3 mt-4 rounded-sm'
            placeholder='Write Details here ....'
            rows={6}
          />

          <button className='text-black bg-white font-semibold text-lg w-full py-2 border-2 border-white mt-4 rounded-sm active:scale-95'>
            Add Note
          </button>

        </form>

      </div>

      <div className='w-full md:w-1/2 border-t-2 md:border-t-0 md:border-l-2 border-white p-4 md:p-7'>

        <h1 className='text-3xl md:text-4xl p-2 md:p-4'>
          Recent Notes
        </h1>

        <div className='flex flex-col sm:flex-row flex-wrap gap-4 mt-4'>

          {task.map((elem, idx) => {
            return (
              <div
                key={idx}
                className='flex flex-col justify-between w-full sm:w-60 h-56 p-5 bg-white rounded-lg text-black shadow-md overflow-hidden'
              >

                <div className='flex-1 overflow-y-auto pr-1'>

                  <h1 className='font-bold text-lg md:text-xl'>
                    {elem.title}
                  </h1>

                  <div className='w-full h-0.5 bg-gray-300 my-2'></div>

                  <p className='text-sm md:text-base wrap-break-word'>
                    {elem.description}
                  </p>

                </div>

                <button
                  onClick={() => deleteTask(idx)}
                  className='bg-red-500 mt-3 rounded-sm w-full active:scale-95 text-white font-semibold py-1'
                >
                  Delete Note
                </button>

              </div>
            )
          })}

        </div>

      </div>

    </div>
  )
}

export default App