import { useEffect, useState } from 'react'
import { CreateContentModal } from '../component/ui/CreateContentModal'
import { Button } from '../component/ui/Button'
import { Card } from '../component/ui/Card'
import { PlusIcon } from '../icon/PlusIcon'
import { ShareIcon } from '../icon/ShareIcon'
import { Sidebar } from '../component/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL, FRONTEND_URL } from '../config'

function Dashboard() {

    const [modalOpen, setModalOpen] = useState(false)
    const { contents, Refresh } = useContent();

    useEffect(() => {
        Refresh();
    }, [modalOpen]);


    return (
        <div >
            <div className='flex'>
                <Sidebar />
                <div className="p-4 flex-1 bg-gray-200">
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
                                onClick={async () => {
                                    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,
                                        {
                                            share: true
                                        }, {
                                        headers: {
                                            "Authorization": localStorage.getItem("token")
                                        }
                                    })
                                    const shareUrl = `${FRONTEND_URL}/api/v1/brain/${response.data.link}`
                                    window.navigator.clipboard.writeText(shareUrl)
                                        .then(() => {
                                            alert("successfully copied");
                                        })
                                        .catch(() => {
                                            alert("something went wrong");
                                        });
                                }}
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
                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {contents.map(({ title, link, type }: any, index: number) => (
                            <div key={index} className="break-inside-avoid">
                                <Card title={title} link={link} type={type} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Footer */}
            <footer className='h-24 bg-white border-t border-gray-300 flex items-center justify-center'>
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Second Brain
                </p>
            </footer>

        </div>
    )
}
export default Dashboard
