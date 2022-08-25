import {useEffect, useState} from 'react'

import Currency from '/data/Currency'
import {api_routes} from '/config'
import {cryptoGraph} from '/functions'

import Template from '/components/dashboard/Template'
import {EditUser} from '/components/tabs/admin/users/EditUser'

export default () => {
	const [usersData, setUsersData] = useState()

	useEffect(() => {
		(async () => {
			const req = await fetch(api_routes.admin.users.all_users)
			const {data} = await req.json()

			setUsersData(data)
		})()
	}, [])

	return (
		<Template>
			<div className = 'container-fluid p-0 bg-white rounded-1x oveflow-0 shadow-sm'>
				<div className = 'row a-i-c p-3'>
					<div className = 'col'>
						<div className = 'bold text-dark text-uppercase flex-h'>
							<span className = 'flex-1 single-line'>Users</span>
						</div>
					</div>
					<div className = 'col-auto'>
						<div className = 'row'>
							{/*<div className = 'col-auto'>
								<button className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-plus-lg fo-s-18'></span>
								</button>
							</div>
							<div className = 'col-auto'>
								<button className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-trash fo-s-18'></span>
								</button>
							</div>
							<div className = 'col-auto'>
								<button onClick = {() => setFloatingWindow(<EditUser />)} className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-pencil fo-s-18'></span>
								</button>
							</div>*/}
						</div>
					</div>
				</div>
				<div className = 'col-12 overflow-x-auto'>
					<div style = {{minWidth: '920px'}} className = 'row bg-light a-i-c p-3'>
						<div className = 'col-2'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Full name</span>
							</div>
						</div>
						<div className = 'col-2'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Email</span>
							</div>
						</div>
						<div className = 'col-2'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Phone</span>
							</div>
						</div>
						<div className = 'col'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Wallet Balance</span>
							</div>
						</div>
						<div className = 'col'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Business category</span>
							</div>
						</div>
						<div className = 'col'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Plan</span>
							</div>
						</div>
						<div className = 'col-1'>
							<div className = 'text-capitalize text-muted bold flex-h'>
								<span className = 'flex-1 single-line'>Status</span>
							</div>
						</div>
						<div className = 'col-1'>
							<div className = 'text-capitalize text-muted bold text-center flex-h'>
								<span className = 'flex-1 single-line'>more</span>
							</div>
						</div>
					</div>
					<div className = 'row'>{
						usersData && usersData.map(({id, full_name, email, phone, status, wallet_balance, business_category_name, service_plan_name}) => (
							<div style = {{minWidth: '920px'}} key = {id} className = 'border-bottom col-12'>
								<div className = 'row a-i-c p-3'>
									<div className = 'col-2'>
										<div className = 'row a-i-c'>
											<div className = 'col-auto col-d-none col-xl-d-block'>
												<div className = 'shadow rounded-lg' style = {{width: '40px', height: '40px', backgroundImage: `url(/images/user_002.png)`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
											</div>
											<div className = 'col'>
												<div className = 'text-dark bold flex-h'>
													<span className = 'flex-1 text-capitalize single-line'>{full_name}</span>
												</div>
												<div className = 'text-muted flex-h'>
													<span className = 'flex-1 single-line'>{id}</span>
												</div>
											</div>
										</div>
									</div>
									<div className = 'col-2'>
										<div className = 'bold flex-h'>
											<a className = 'flex-1 single-line text-primary underline' href = {`mailto://{email}`}>{email}</a>
										</div>
									</div>
									<div className = 'col-2'>
										<div className = 'bold flex-h'>
											<a className = 'flex-1 single-line text-primary underline' href = {`tel://${phone}`}>{phone}</a>
										</div>
									</div>
									<div className = 'col'>
										<div className = 'bold flex-h'>
											<span className = 'flex-1 single-line'>{Currency}{wallet_balance}</span>
										</div>
									</div>
									<div className = 'col'>
										<div className = 'text-capitalize text-muted bold flex-h'>
											<span className = 'flex-1 single-line'>{business_category_name}</span>
										</div>
									</div>
									<div className = 'col'>
										<div className = 'text-capitalize text-muted bold flex-h'>
											<span className = 'flex-1 single-line'>{service_plan_name}</span>
										</div>
									</div>
									<div className = 'col-1'>
										<div className = 'text-capitalize text-muted bold flex-h'>
											<span className = 'flex-1 single-line'>{status}</span>
										</div>
									</div>
									<div className = 'col-1'>
										<div className = 'text-capitalize text-muted bold text-center'>
											<button className = 'bg-clear border-0 px-2'>
												<span className = 'bi bi-window-stack fo-s-18'></span>
											</button>
										</div>
									</div>
								</div>
							</div>
						))
					}</div>
				</div>
			</div>
		</Template>
	)
}