import { useState } from 'react'
import './App.css'
import { Button } from './component/ui/Button'
import { PlusIcon } from './icon/PlusIcon'

function App() {

  return (
    <div >
      <Button startIcon={<PlusIcon />} varient='secondary' size="lg" onClick={() => { }} text="Share" />
      <Button varient='primary' size="md" onClick={() => { }} text="Add Content" />
      <Button varient='secondary' size="sm" onClick={() => { }} text="Blog ashdasd asd as d" />
    </div >
  )
}

export default App
