import {useState, useEffect} from 'react'
import {CheckBox} from '../components/form'

export default () => {
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
										<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>lost password?</h4>
										<div className = 'text-white bold'>Enter your details to recover</div>
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
									<h4 className = 'line-h-150pcent text-capitalize mb-3 bold'>lost password?<br />enter details to recover</h4>
									<div className = 'text-muted'>Enter your details to proceed further</div>
								</div>
								<div className = 'pt-5'>
									<div className = 'mb-5'>
										<p className = 'text-muted mb-1 bold'>Email</p>
										<div className = 'border-bottom flex-h a-i-c'>
											<input name = 'email' type = 'email' className = 'py-3 border-0 outline-0 flex-1 bold text-dark' />
											<span className = 'bi bi-envelope-open ml-3'></span>
										</div>
									</div>
									<div className = 'mb-5 row'>
										<div className = 'col-auto mb-3'>
											<button className = 'text-capitalize btn theme-bg px-5 py-3 text-white rounded-lg shadow bold'>recover</button>
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