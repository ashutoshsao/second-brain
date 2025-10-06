import './App.css'
import { Button } from './component/ui/Button'
import { PlusIcon } from './icon/PlusIcon'
import { ShareIcon } from './icon/ShareIcon'

function App() {

  return (
    < >
      <Button
        startIcon={<PlusIcon size='lg' />}
        varient='primary'
        size="lg"
        onClick={() => { }}
        text="Share"
        endIcon={< ShareIcon size='lg' />}
      />
      <Button
        startIcon={<PlusIcon size='sm' />}
        varient='primary'
        size="sm"
        onClick={() => { }}
        text="Share"
        endIcon={< ShareIcon size='sm' />}
      />
    </ >
  )
}

export default App
