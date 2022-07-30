import {useContext, useEffect, useState} from 'react'
import {CheckBox, Button} from '../../form'
import {RegisterContext} from '../../../contexts/tabs/register'
import {notify} from '../../popups'
import {api_routes} from '../../../config'
import {parseObjectToFormData, cookieStore, cryptoGraph} from '../../../functions'

const CollectUserDataRight = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => setIsVisible(true), [])

	return (
		<div className = {`${isVisible ? '' : 'opacity-0'} py-4 animated fadeIn col-lg-100vh col-lg-overflow-y-auto`}>
			<div style = {{minHeight: '100%'}} className = 'overflow-y-auto flex-v j-c-c'>
				<div className = 'py-4 mx-auto col-md-10 col-lg-8'>
					<div className = 'col-d-none col-lg-d-block'>
						<img className = 'd-block w-100' src = '/images/boy-doing-online-payment.webp' />
					</div>
					<div className = 'col-lg-d-none'>
						<div className = 'text-center my-5 py-5 text-white'>
							<img className = '' width = '100' src = '/favicon.ico' />
							<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>welcome to Briand</h4>
							<div className = 'text-white bold'>Enter your details to proceed further</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const CollectUserDataLeft = () => {
	const [isVisible, setIsVisible] = useState(false)
	const {nextTab, getFormData: {
		email, password, full_name, c_password, agreement_consent
	}, updateFormData} = useContext(RegisterContext)

	useEffect(() => setIsVisible(true), [])

	return (
		<div className = {`${isVisible ? '' : 'opacity-0'} py-4 animated fadeIn col-lg-100vh col-lg-overflow-y-auto`}>
			<div style = {{minHeight: '100%'}} className = 'flex-v j-c-c'>
				<div className = 'py-4 mx-auto col-md-10 col-lg-8'>
					<div className = 'col-d-none col-lg-d-block'>
						<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>welcome to Briand<br />please, sign up to get started.</h4>
						<div className = 'text-muted'>Enter your details to proceed further</div>
					</div>
					<div className = 'pt-5'>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Full name</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<input placeholder = 'Surname first' value = {full_name} onChange = {(e) => updateFormData({full_name: e.target.value})} name = 'name' type = 'text' className = 'py-3 border-0 outline-0 text-capitalize flex-1 bold text-dark' />
								<span className = 'bi fo-s-15 bi-person ml-3'></span>
							</div>
						</div>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Email</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<input placeholder = 'Enter your active email' value = {email} onChange = {(e) => updateFormData({email: e.target.value})} name = 'email' type = 'email' className = 'py-3 border-0 outline-0 flex-1 bold text-dark' />
								<span className = 'bi fo-s-15 bi-envelope-open ml-3'></span>
							</div>
						</div>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Password</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<input placeholder = 'Minimum of 8 characters' value = {password} onChange = {(e) => updateFormData({password: e.target.value})} type = 'password' className = 'py-3 border-0 outline-0 text-capitalize flex-1 bold text-dark' />
								<span className = 'bi fo-s-15 bi-lock ml-3'></span>
							</div>
						</div>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Confirm password</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<input placeholder = 'Repeat password' value = {c_password} onChange = {(e) => updateFormData({c_password: e.target.value})} type = 'password' className = 'py-3 border-0 outline-0 text-capitalize flex-1 bold text-dark' />
								<span className = 'bi fo-s-15 bi-lock ml-3'></span>
							</div>
						</div>
						<div className = 'mb-5'>
							<CheckBox value = {agreement_consent} onChange = {(consent) => updateFormData({agreement_consent: consent})} title = 'I agree with terms &amp; conditions' />
						</div>
						<div className = 'mt-5 row'>
							<div className = 'col-12 col-sm-6 mb-3'>
								<Button onClick = {() => (
									([email, full_name, password, c_password].includes(''))
									? notify({type: 'danger', message: 'One or more fields are empty!'})
									: (
										(password !== c_password)
										? notify({type: 'danger', message: 'Passwords do not match!'})
										: (
											(password.length < 8)
											? notify({type: 'danger', message: 'Passwords must be at least 8 characters long!'})
											: (
												(!agreement_consent)
												? notify({type: 'danger', message: 'You have to agree to terms & conditions to proceed!'})
												: nextTab()
											)
										)
									)
								)} className = 'd-block w-100 text-capitalize btn theme-bg px-5 py-3 text-white rounded-lg shadow bold'>sign up</Button>
							</div>
							<div className = 'col-12 col-sm-6 mb-3'>
								<Button onClick = {() => window.location = '/login'} className = 'd-block w-100 text-capitalize btn bg-light px-5 py-3 theme-color rounded-lg shadow-sm bold'>sign in</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const CollectBusinessDataRight = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => setIsVisible(true), [])

	return (
		<div className = {`${isVisible ? '' : 'opacity-0'} py-4 animated fadeIn col-lg-100vh col-lg-overflow-y-auto`}>
			<div style = {{minHeight: '100%'}} className = 'overflow-y-auto flex-v j-c-c'>
				<div className = 'py-4 mx-auto col-md-10 col-lg-8'>
					<div className = 'col-d-none col-lg-d-block'>
						<img className = 'd-block w-100' src = '/images/boy-doing-online-payment.webp' />
					</div>
					<div className = 'col-lg-d-none'>
						<div className = 'text-center my-5 py-5 text-white'>
							<img className = '' width = '100' src = '/favicon.ico' />
							<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>welcome to Briand</h4>
							<div className = 'text-white bold'>Enter your details to proceed further</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const CollectBusinessDataLeft = () => {
	const [isVisible, setIsVisible] = useState(false)
	const [businessCategory, setBusinessCategory] = useState([])
	const {previousTab, getFormData, updateFormData} = useContext(RegisterContext)
	const {phone, business_category_id} = getFormData

	useEffect(async () => {
		setIsVisible(true)
		const req = await fetch(api_routes.business_category)
		const {data} = await req.json()

		setBusinessCategory(data)
	}, [])

	return (
		<div className = {`${isVisible ? '' : 'opacity-0'} py-4 animated fadeIn col-lg-100vh col-lg-overflow-y-auto`}>
			<div style = {{minHeight: '100%'}} className = 'flex-v j-c-c'>
				<div className = 'py-4 mx-auto col-md-10 col-lg-8'>
					<div className = 'col-d-none col-lg-d-block'>
						<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>welcome to Briand<br />please, sign up to get started.</h4>
						<div className = 'text-muted'>Enter your details to proceed further</div>
					</div>
					<div className = 'pt-5'>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Phone</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<input size = '20' placeholder = 'Telephone' value = {phone} onChange = {(e) => updateFormData({phone: e.target.value})} type = 'phone' className = 'py-3 border-0 outline-0 text-capitalize flex-1 bold text-dark' />
								<span className = 'bi fo-s-15 bi-telephone ml-3'></span>
							</div>
						</div>
						<div className = 'mb-5'>
							<p className = 'text-muted mb-1 bold'>Choose category</p>
							<div className = 'border-bottom flex-h a-i-c'>
								<select value = {business_category_id} onChange = {(e) => updateFormData({business_category_id: e.target.value})} type = 'password' className = 'py-3 border-0 outline-0 text-capitalize flex-1 text-muted'>
									<option value = ''>--- choose category ---</option>{
										businessCategory.map(({id, name}) => (
											<option key = {id} value = {id}>{name}</option>
										))
									}
								</select>
							</div>
						</div>
						<div className = 'mb-5 row'>
							<div className = 'col-12 col-sm-6 mb-3'>
								<Button onClick = {() => previousTab()} className = 'd-block w-100 text-capitalize btn bg-light px-5 py-3 theme-color rounded-lg shadow-sm bold'>back</Button>
							</div>
							<div className = 'col-12 col-sm-6 mb-3'>
								<Button onClick = {() => (
									([phone, business_category_id].includes(''))
									? notify({type: 'danger', message: 'One or more fields are empty!'})
									: fetch(api_routes.register, {method: 'POST', body: parseObjectToFormData(getFormData)}).then(resolved => resolved.json()).then(({type, data, user_data}) => notify({
										type: type === 'success' ? type : 'danger',
										message: data,
										callback: () => (
											(type === 'success')
											? cookieStore.set({
												name: 'BRIAND',
												value: cryptoGraph.encrypt(JSON.stringify(user_data)),
												expires: (new Date().getTime() + (1000 * 3600 * 24 * 30)),
												path: '/'
											}).then(() => window.location = '/dashboard')
											: undefined
										)
									}))
								)} className = 'd-block w-100 text-capitalize btn theme-bg px-5 py-3 text-white rounded-lg shadow bold'>finish</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default [
	[<CollectUserDataRight />, <CollectUserDataLeft />],
	[<CollectBusinessDataRight />, <CollectBusinessDataLeft />],
]