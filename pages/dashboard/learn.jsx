import Template from '/components/dashboard/Template'
import {
	GlobalContext
} from '/contexts/Global'
import {
	CheckBox,
	Loader
} from '/components/form'
import {
	cookieStore,
	parseObjectToFormData,
	cryptoGraph
} from '/functions'
import {
	api_routes,
	server
} from '/config'
import {
	useState,
	useEffect,
	useContext
} from 'react'

export default () => {
	const [videos, setVideos] = useState()
	const {userData} = useContext(GlobalContext)

	useEffect(() => {
		fetch(api_routes.dashboard.learn.get_videos, {
			method: 'POST',
			body: parseObjectToFormData(userData)
		})
		.then(res => res.json())
		.then(({data}) => setVideos(data))
	}, [])

	return (
		<Template>
			<div className = 'bg-white p-4 p-lg-5 rounded-1x border shadow-sm'>
				<div className = 'row mb-5'>
					<div className = 'col'>
						<input type = 'search' className = 'p-3 bg-white border rounded-lg d-block w-100 outline-0 shadow' placeholder = 'Search for videos' />
					</div>
					<div className = 'col-auto'>
						<button className = 'py-3 px-4 theme-bg rounded-lg bold text-capitalize text-white border-0 letter-spacing-1 outline-0 shadow'>search</button>
					</div>
				</div>
				<div className = 'row'>{
					(videos)
					? (
						(videos.length > 0)
						? videos.map(videoData => (
							<div key = {videoData.id} className = 'col-md-4 col-12 col-sm-6 col-lg-4 col-xl-3 mb-5'>
								<VideoCards {...videoData} />
							</div>
						))
						: (
							<div className = 'col-12 my-5'>
								<Loader />
							</div>
						)
					)
					: (
						<div className = 'col-12 my-5'>
							<Loader />
						</div>
					)
				}</div>
			</div>
		</Template>
	)
}

const VideoCards = ({id, description, planID, timestamp, title, video_location}) => (
	<div className = 'border rounded-1x overflow-0'>
		<div className = 'video-card-image flex-v a-i-c j-c-c bg-light po-rel'>
			<div className = 'w-100 flex-h a-i-c p-3 po-abs top-0 left-0'>
				<div className = 'flex-1'>
					<CheckBox
						checkedColorClassName = 'text-white'
						unCheckedColorClassName = 'text-white'
						className = 'fo-s-16'
					/>
				</div>
				<div>
					<span className = 'd-inline-block p-3 bg-light text-capitalize rounded-lg'>Engineering</span>
				</div>
			</div>
			<video src = {`${server.backend.url}/${video_location}`} className = 'd-block w-100'></video>
		</div>
		<div className = 'p-3 text-center'>
			<h5 className = 'bold one-line mb-2 text-capitalize'>{title}</h5>
			<p className = 'one-line text-muted text-capitalize'>{description}</p>
		</div>
		<div className = 'border-top'>
			<a target = {!true ? '_self' : '_blank'} href = {!true ? `/videos/${id}` : `${server.backend.url}${video_location}`} className = 'flicker d-block w-100 py-4 outline-0 px-3 text-white bold text-center border-0 theme-bg text-capitalize letter-spacing-1 flex-h a-i-c'>
				<span>watch video</span>
				<span className = 'ml-2 bi bi-play-circle fo-s-15 v-align-0'></span>
			</a>
		</div>
		<style jsx>{`
			.video-card-image{
				height: 200px;
				background-image: url();
				background-size: cover;
				background-position: center;
			}
		`}</style>
	</div>
)

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
	console.log(cryptoGraph.decrypt(briand_cookie))

	return {
		props: {
			userData: JSON.parse(cryptoGraph.decrypt(briand_cookie))
		}
	}
}
