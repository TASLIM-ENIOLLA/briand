import ReactDOM from 'react-dom'
import {
    useState, useEffect, useRef
} from 'react'
import {
    fileReader, parseObjectToFormData
} from '/functions'
import {
    api_routes
} from '/config'
import {
    Button
} from '/components/form'
import {
    notify
} from '/components/popups'

export const NewUploadAction = {
    tab: {
        toggle: () => (
            (!!document.querySelector('#new-upload'))
            ? (
                ReactDOM.unmountComponentAtNode(
                    document.querySelector(`#__floating__window`)
                )
            )
            : (
                ReactDOM.render(
                    <NewUpload />,
                    document.querySelector('#__floating__window')
                )
            )
        ),
    }
}

const VideoUpload = ({file}) => {
    const [videoData, setVideoData] = useState()

    fileReader(file).then(fileURI => setVideoData(fileURI))

    return (
        <div className = 'py-3'>{
            (videoData)
            ? (
                <video src = {videoData} controls = {true} className="bg-light d-block w-100"></video>
            )
            : (
                <div className="text-center">
                    <span className="fa bi-moon-fill text-muted fa-spin fa-5x"></span>
                    <p className="text-capitalize my-3">loading preview</p>
                </div>
            )
        }</div>
    )
}

const SelectVideo = ({onChange}) => {
    const fileLabel = useRef()
    const [file, setFile] = useState()

    useEffect(() => onChange(file), [file])

    return (
        <button className="bg-clear border-0" onClick = {() => fileLabel.current.click()}>
            <label ref = {fileLabel} className = 'pointer-events-0 underline cursor-pointer text-capitalize flex-h a-i-c py-4'>
                <span className="bi bi-cloud-upload mr-3 fo-s-15"></span>
                <span>upload video attachment (max 50MB)</span>
                <input onChange = {(e) => {
                    if(e.target.files.length > 0){
                        setFile(e.target.files)
                    }
                }} type="file" accept = '.mkv, .mp4, .3gpp' hidden = {true}/>
            </label>
        </button>
    )
}

const NewUpload = () => {
    const [canSubmit, setCanSubmit] = useState(false)
    const [category, setCategory] = useState([])
    const [plan, setPlan] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        categoryID: '',
        planID: '',
        description: '',
        video: undefined
    })

    useEffect(() => {
        setCanSubmit(!([formData.title, formData.description, formData.planID, formData.categoryID].includes('') || formData.video === undefined))
    }, [formData])

    useEffect(() => {
        fetch(api_routes.service_plans)
        .then(res => res.json())
        .then(({data}) => setPlan(data))
        
        fetch(api_routes.business_categories)
        .then(res => res.json())
        .then(({data}) => setCategory(data))
    }, [])

    return (
        <div id = 'new-upload' style = {{zIndex: 1000}} className = 'animated fadeIn vh100 vw100 bg-dark-lucent po-fixed top-0 left-0 py-10 px-5 overflow-y-auto'>
            <div className = 'window-md rounded-lg overflow-0 shadow bg-white po-rel'>
                <button onClick = {() => NewUploadAction.tab.toggle()} className="bg-danger px-3 py-2 po-abs border top-0 right-0 rounded-lg">
                    <span className="bi bi-x fa-2x text-white"></span>
                </button>
                <div className = 'px-4 py-5'>
                    <h5 className="text-dark text-capitalize bold mx-3">new upload</h5>
                </div>
                <div className = 'p-4'>
                    <div className = 'mb-5 px-3'>
                        <p className="text-muted text-capitalize">title</p>
                        <input value = {formData.title} onChange = {(e) => setFormData({...formData, title: e.target.value})} type="text" className="outline-0 border-0 py-3 bg-clear d-block w-100" />
                        <hr className = 'border m-0 border-bottom'/>
                    </div>
                    <div className = 'mb-5 px-3'>
                        <p className="text-muted text-capitalize">category</p>
                        <select value = {formData.categoryID} onChange = {(e) => setFormData({...formData, categoryID: e.target.value})} className="text-capitalize outline-0 border-0 py-3 bg-clear d-block w-100">
                            <option value = ''>--- select category ---</option>{
                                category.map(({id, name}) => (
                                    <option key = {id} value = {id}>{name}</option>
                                ))
                            }
                        </select>
                        <hr className = 'border m-0 border-bottom'/>
                    </div>
                    <div className = 'mb-5 px-3'>
                        <p className="text-muted text-capitalize">plan</p>
                        <select value = {formData.planID} onChange = {(e) => setFormData({...formData, planID: e.target.value})} className="text-capitalize outline-0 border-0 py-3 bg-clear d-block w-100">
                            <option value = ''>--- select plan ---</option>{
                                plan.map(({id, name}) => (
                                    <option key = {id} value = {id}>{name}</option>
                                ))
                            }
                        </select>
                        <hr className = 'border m-0 border-bottom'/>
                    </div>
                    <div className = 'mb-5 px-3'>
                        <p className="text-muted text-capitalize">description</p>
                        <textarea value = {formData.description} onChange = {(e) => setFormData({...formData, description: e.target.value})} rows = '4' className="resize-0 outline-0 border-0 py-3 bg-clear d-block w-100"></textarea>
                        <hr className = 'border m-0 border-bottom'/>
                    </div>
                    <div className = 'mb-5 px-3'>
                        <p className="text-muted text-capitalize">video attachment</p>{
                            (formData.video)
                            ? <VideoUpload file = {formData.video} />
                            : <SelectVideo onChange = {(files) => files && files.length > 0 && setFormData({...formData, video: files[0]})} />
                        }
                    </div>
                </div>
                <div className = 'bg-light px-4 py-3 text-right border-top'>
                    <Button disabled = {!canSubmit} className = {`${!canSubmit ? 'disabled' : ''} btn btn-primary px-5 py-3 rounded-lg text-capitalize`} onClick = {() => CreateNewUpload(formData).then(({data, type}) => {
                        notify({
                            message: data,
                            type: type === 'success' ? type : 'danger',
                            onSuccess: () => window.location.reload()
                        })
                    })}>upload</Button>
                </div>
            </div>
            <style jsx>{`
                .window-lg{
                    margin: auto;
                    max-width: 768px;
                }
                .window-md{
                    margin: auto;
                    max-width: 576px;
                }
                .bg-dark-lucent{
                    background: rgba(0,0,0,.5);
                }
                .py-10{
                    padding: 7rem 0;
                }
            `}</style>
        </div>
    )
}

const CreateNewUpload = (formData) => fetch(api_routes.admin.video_upload.new, {
    method: 'POST',
    body: parseObjectToFormData(formData)
})
.then(res => res.json())