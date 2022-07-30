import {useState, useEffect} from 'react'
import {CheckBox} from '../components/form'
import {notify} from '../components/popups'
import {api_routes} from '../config'
import {parseObjectToFormData, cookieStore, cryptoGraph} from '../functions'

export default () => {
	const [formData, setFormData] = useState({email: '', password: '', rememberMe: true})

	return (
		<section className = 'col-lg-100vh theme-bg container-fluid'>
			<div className = 'row' style = {{flexDirection: 'row-reverse'}}>
				<div className = 'col-lg-6'>
					<div className = 'col-lg-100vh col-lg-overflow-y-auto'>
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
				</div>
				<div className = 'col-lg-6 bg-white col-rounded-y-plus-2x col-lg-rounded-x-plus-2x'>
					<div className = 'col-lg-100vh col-lg-overflow-y-auto'>
						<div style = {{minHeight: '100%'}} className = 'flex-v j-c-c'>
							<div className = 'py-4 mx-auto col-md-10 col-lg-8'>
								<div className = 'col-d-none col-lg-d-block'>
									<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>welcome to Briand<br />sign in to see latest updates.</h4>
									<div className = 'text-muted'>Enter your details to proceed further</div>
								</div>
								<div className = 'pt-5'>
									<div className = 'mb-5'>
										<p className = 'text-muted mb-1 bold'>Email</p>
										<div className = 'border-bottom flex-h a-i-c'>
											<input value = {formData.email} onChange = {(e) => setFormData({...formData, email: e.target.value})} name = 'email' type = 'email' className = 'py-3 border-0 outline-0 flex-1 bold text-dark' />
											<span className = 'bi bi-envelope-open ml-3'></span>
										</div>
									</div>
									<div className = 'mb-5'>
										<p className = 'text-muted mb-1 bold'>Password</p>
										<div className = 'border-bottom flex-h a-i-c'>
											<input value = {formData.password} onChange = {(e) => setFormData({...formData, password: e.target.value})} type = 'password' className = 'py-3 border-0 outline-0 text-capitalize flex-1 bold text-dark' />
											<span className = 'bi bi-lock ml-3'></span>
										</div>
									</div>
									<div className = 'mb-5'>
										<div className = 'row j-c-space-between'>
											<div className = 'col-auto col-sm-auto mb-3'>
												<CheckBox value = {formData.rememberMe} onChange = {(e) => setFormData({...formData, rememberMe: e})} title = 'Remember me' />
											</div>
											<div className = 'col-auto col-sm-auto mb-3'>
												<a href = '/recover-password' className = 'theme-color underline bold'>Recover password</a>
											</div>
										</div>
									</div>
									<div className = 'mb-5 row'>
										<div className = 'col-auto mb-3'>
											<button onClick = {() => Login(formData).then(
												({type, remember_me, user_data, data}) => notify({
													type: type === 'success' ? type : 'danger',
													message: data,
													callback: () => (
														(type !== 'success')
														? undefined
														: cookieStore.set({
															name: 'BRIAND',
															value: cryptoGraph.encrypt(JSON.stringify(user_data)),
															expires: (
																(remember_me)
																? (new Date().getTime() + (1000 * 3600 * 24 * 30))
																: ''
															),
															path: '/'
														}).then(() => window.location = '/dashboard')
													)
												})
											)} className = 'text-capitalize btn theme-bg px-5 py-3 text-white rounded-lg shadow bold'>sign in</button>
										</div>
										<div className = 'col-auto mb-3'>
											<button onClick = {() => window.location = '/register'} className = 'text-capitalize btn bg-light px-5 py-3 theme-color rounded-lg shadow-sm bold'>sign up</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.line-h-150pcent{
					line-height: 150%;
				}
			`}</style>
		</section>
	)
}

const Login = (formData) => {
	return fetch(api_routes.login, {method: 'POST', body: parseObjectToFormData(formData)}).then(response => response.json())
}

export const getServerSideProps = async (context) => {
	const {req: {cookies}} = context
	const briand_cookie = cookies['BRIAND'] ? cookies['BRIAND'] : undefined

	if(briand_cookie){
		return {
			redirect: {
				destination: '/dashboard'
			}
		}
	}
	
	return {
		props: {}
	}
}