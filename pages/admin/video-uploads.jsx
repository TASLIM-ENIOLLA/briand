const NewUpload = import('../../components/tabs/admin/video-upload/new-upload')

import Template from '../../components/dashboard/Template'
import React, {
	useState, useEffect
} from 'react'
import {
	cryptoGraph
} from '../../functions'
import {
	api_routes, server
} from '/config'

export default () => {
	const [NewUploadAction, setNewUploadAction] = useState()
	const [videoUploads, setVideoUploads] = useState()
	
	NewUpload.then(({NewUploadAction}) => setNewUploadAction(NewUploadAction))

	useEffect(() => {
        fetch(api_routes.admin.video_upload.all)
        .then(res => res.json())
        .then(({data}) => setVideoUploads(data))
    }, [])

	return (
		<Template title = 'video uploads'>
			<div>
				<div className="py-4">
					<button onClick = {() => NewUploadAction.tab.toggle()} className = 'btn-primary btn flex-h a-i-c px-3 py-2 half-bold text-capitalize'>
						<span className = 'bi bi-plus-circle-fill mr-2 mb-1'></span>
						<span>new upload</span>
					</button>
				</div>
			</div>
			<div className = 'rounded-1x shadow-sm bg-white border overflow-x-auto'>
				<div className = 'p-4-'>
					
				</div>
				<div style = {{minWidth: '830px'}}>
					<div className = 'p-4 bg-light'>
						<div className = 'container-fluid px-0'>
							<div className = 'row'>
								<div className = 'col-4'>
									<p className = 'm-0 text-muted half-bold text-muted text-capitalize half-bold one-line'>video</p>
								</div>
								<div className = 'col'>
									<p className = 'm-0 text-muted half-bold text-muted text-capitalize half-bold one-line'>description</p>
								</div>
								<div className = 'col-2'>
									<p className = 'm-0 text-muted half-bold text-muted text-capitalize half-bold one-line'>upload date</p>
								</div>
							</div>
						</div>
					</div>
					<div className = 'px-4 py-2'>
						<div className = 'container-fluid'>{
							(videoUploads)
							? (
								(videoUploads.length > 0)
								? videoUploads.map(({id, title, location, timestamp, category, description}) => (
									<div key = {id} className = 'row a-i-c my-4'>
										<div className = 'col-4'>
											<div className = 'row a-i-c'>
												<div style = {{background: '#6f42c177', width: '40px', height: '40px'}} className = 'rounded-lg shadow flex-v a-i-c'>
													<a target = '_blank' href = {`${server.backend.url}/${location}`} className="bi bi-play fa-2x text-white"></a>
												</div>
												<div className = 'col'>
													<p className = 'one-line bold text-capitalize text-dark'>{title}</p>
													<p className = 'one-line text-capitalize text-muted'>{category}</p>
												</div>
											</div>
										</div>
										<div className = 'col'>
											<p className = 'm-0 text-muted half-bold text-muted text-capitalize one-line'>{description}</p>
										</div>
										<div className = 'col-2'>
											<div className="col-12">
												<div className="text-center half-bold flex-h">
													<span className = 'flex-1 single-line text-capitalize text-muted'>
														{new Date(timestamp).toDateString()}&nbsp;
														{new Date(timestamp).toLocaleTimeString()} 
													</span>
												</div>
											</div>
										</div>
									</div>
								))
								: (
									<div className="col-12 bg-white p-5 text-center bold text-muted">
										<p>
											<span className="fa bi-robot fa-3x"></span>
										</p>
										<p className = 'text-capitalize'>Empty rows returned!</p>
									</div>
								)
							)
							: (
								(videoUploads === undefined)
								? (
									<div className="col-12 bg-white p-5 text-center bold">
										<p>
											<span className="fa bi-arrow-clockwise fa-3x fa-spin"></span>
										</p>
										<p className = 'text-capitalize'>loading</p>
									</div>
								)
								: (
									<div className="col-12 bg-white p-5 text-center bold text-muted">
										<p>
											<span className="fa bi-info-circle fa-3x"></span>
										</p>
										<p className = 'text-capitalize'>Empty rows returned!</p>
									</div>
								)
							)
						}</div>
					</div>
				</div>
			</div>
		</Template>
	)
}

export const getServerSideProps = async (context) => {
	const {req: {cookies}} = context
	const briand_cookie = cookies['BRIAND'] ? cookies['BRIAND'] : undefined

	if(!briand_cookie){
		return {
			redirect: {
				destination: '/'
			}
		}
	}
	
	return {
		props: {
			userData: JSON.parse(cryptoGraph.decrypt(briand_cookie))
		}
	}
}
