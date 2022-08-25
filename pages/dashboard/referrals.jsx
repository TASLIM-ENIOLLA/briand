import Template from '../../components/dashboard/Template'
import {cryptoGraph, parseObjectToFormData} from '../../functions'
import {GlobalContext} from '../../contexts/Global'
import {useEffect, useContext, useState} from 'react'
import {useRouter} from 'next/router'
import {Button} from '../../components/form'
import {api_routes, server} from '../../config'
import {notify} from '../../components/popups'

export default () => {
	const {asPath} = useRouter()
	const {userData} = useContext(GlobalContext)
	const [userReferralData, setUserReferralData] = useState()
	const [userReferreeData, setUserReferreeData] = useState()
	const [location, setLocation] = useState('')
	
	useEffect(async () => {
		const req = await fetch(api_routes.dashboard.referrals.get_user_referral_data, {method: 'POST', body: parseObjectToFormData(userData)})
		const {data} = await req.json()

		setLocation(window.location.origin)
		setUserReferralData(data)
	}, [])

	useEffect(async () => {
		if(userReferralData !== undefined){
			const req = await fetch(api_routes.dashboard.referrals.get_user_referree_data, {method: 'POST', body: parseObjectToFormData(userData)})
			const {data} = await req.json()

			setUserReferreeData(data)
		}
	}, [userReferralData])

	return (
		<Template>
			<div className = 'rounded-1x bg-white pt-5 pb-4 mb-5 fo-s-15 px-4'>
				<div>
					<div className = 'mb-2'>
						<div className = 'text-capitalize bold letter-spacing-1 mb-2'>create referral link</div>
						<p className = 'mb-4 text-muted'>New users can register using your referral link & you get to recieve 80% cashback.</p>
					</div>
				</div>
				<div>
					<div className = 'mb-4'>{
						(userReferralData)
						? (
							<div className = 'row a-i-c' style = {{maxWidth: 'auto'}}>
								<div className = 'col'>
									<div className = 'flex-h bg-light border-0 rounded-lg w-100 p-3 bold disabled'>
										<span className = 'flex-1 single-line'>
											{`${location}/register?referree_id=${userReferralData.referral_id}`}
										</span>
									</div>
								</div>
								<div className = 'col-auto'>
									<div>
										<button title = 'Copy link' className = 'mx-3 d-inline-block btn text-muted bg-clear border-0'>
											<span className = 'bi bi-stickies-fill fo-s-20'></span>
										</button>
										<a target = '_blank' href = {`${location}/register?referree_id=${userReferralData.referral_id}`} title = 'Open link in new tab' className = 'mx-3 btn d-inline-block text-primary bg-clear border-0'>
											<span className = 'bi bi-box-arrow-up-right fo-s-20'></span>
										</a>
										<button onClick = {() => RemoveUserReferralID({
											referral_id: userReferralData.referral_id
										}).then(({data, type}) => notify({
											type: type === 'success' ? type : 'error',
											message: data,
											callback: () => {
												setUserReferralData(null)
											}
										}))} title = 'Remove link' className = 'mx-3 d-inline-block btn text-danger bg-clear border-0'>
											<span className = 'bi bi-trash-fill fo-s-20'></span>
										</button>
									</div>
								</div>
							</div>
						)
						: (
							(userReferralData === null)
							? (
								<Button onClick = {() => CreateReferralLink(userData).then(({type, data, referral_data}) => notify({
									type: type === 'success' ? type : 'error',
									message: data,
									callback: () => setUserReferralData(referral_data)
								}))} type = 'button' className = 'py-3 rounded-lg text-white bold px-5 bg-success btn border text-capitalize'>create link</Button>
							)
							: <></>
						)
					}</div>
				</div>
			</div>
			<div className = 'rounded-1x bg-white pt-5 pb-4 mb-5 fo-s-15 px-4'>
				<div>
					<div className = 'mb-2'>
						<div className = 'text-capitalize bold letter-spacing-1 mb-2'>my referree</div>
						<p className = 'mb-4 text-muted'>You registered using this user's referral link.</p>
					</div>
				</div>
				<div>
					<div className = 'mb-4'>{
						(userReferreeData)
						? (
							<div className = ''>
								<div className = 'p-3 bg-light rounded-1x shadow-sm flex-h a-i-c'>
									<div>
										<div className = 'rounded-circle shadow-sm border' style = {{width: '40px', height: '40px', backgroundImage: 'url(/images/user_002.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
									</div>
									<div className = 'px-2 bg-clear disabled border-0 user-select-0 outline-0 text-capitalize flex-1 bold text-dark'>
										{userReferreeData.full_name}
									</div>
								</div>
							</div>
						)
						: (<></>)
					}</div>
				</div>
			</div>
		</Template>
	)
}

const RemoveUserReferralID = (referral_id) => {
	return fetch(api_routes.dashboard.referrals.remove_user_referral_id, {method: 'POST', body: parseObjectToFormData(referral_id)}).then(e => e.json())
}

const CreateReferralLink = (userData) => {
	return fetch(api_routes.dashboard.referrals.create_referral_link, {method: 'POST', body: parseObjectToFormData(userData)}).then(e => e.json())
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
