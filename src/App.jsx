import { useState } from 'react'
import RichTextEditor from './richtexteditor.jsx'

function App() {
  const [rteContent, setRteContent] = useState('')

  return (
    <div className="relative mx-auto pt-11 w-screen">
      <div className='flex flex-row gap-4'>
        <RichTextEditor content={setRteContent} />
        <div id='result' className=''>
          {rteContent}
        </div>
      </div>
    </div>
  )
}

export default App
