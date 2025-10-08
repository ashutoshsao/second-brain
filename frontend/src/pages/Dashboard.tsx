import { useState } from 'react'
import { CreateContentModal } from '../component/ui/CreateContentModal'
import { Button } from '../component/ui/Button'
import { Card } from '../component/ui/Card'
import { PlusIcon } from '../icon/PlusIcon'
import { ShareIcon } from '../icon/ShareIcon'
import { Sidebar } from '../component/ui/Sidebar'

function Dashboard() {

    const [modalOpen, setModalOpen] = useState(false)
    return (
        <div className='flex'>
            <Sidebar />
            <div className="p-4 h-screen w-screen top-0 left-0 bg-gray-200">
                <CreateContentModal open={modalOpen} onClose={() => {
                    setModalOpen(false)
                }} />
                <div className='flex justify-between gap-4 pb-4 items-center'>
                    <div className='text-2xl font-semibold'>
                        All Notes
                    </div>
                    <div className='flex justify-end gap-4'>
                        <Button
                            startIcon={< ShareIcon />}
                            varient='secondary'
                            size="md"
                            text="Share Brain"
                        />
                        <Button
                            startIcon={<PlusIcon />}
                            varient='primary'
                            size="md"
                            onClick={() => { setModalOpen(true) }}
                            text="Add Content"
                        />
                    </div>
                </div>

                <div className='gap-4 flex'>
                    <Card title="Tweet" link="https://x.com/sha_zng/status/1975660049600278830" type="twitter" />
                    <Card title="YouTube video" link="https://www.youtube.com/watch?v=rE7xqjO5UMI" type="youtube" />
                </div>
            </div>
        </div>
    )
}
export default Dashboard
