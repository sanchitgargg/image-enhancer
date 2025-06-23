import React from 'react'
import Home from './components/Home'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-2">AI Image enhancer</h1>
        <p className="text-lg text-gray-500">
        Upload your Image and let AI enhance it in seconds!!
        </p>
      </div>
      <Home/>

      <div className="text-lg text-gray-500 mt-6">
        <p>Powered By @sanchitgargg</p>
      </div>
    </div>
  )
}

export default App