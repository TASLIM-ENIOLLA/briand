import {useEffect, useState} from 'react'

import Currency from '/data/Currency'
import {api_routes} from '/config'
import {cryptoGraph} from '/functions'

import Template from '/components/dashboard/Template'
import EditPlan from '/components/tabs/admin/plans/EditPlan'
import {PlansContext} from '/contexts/tabs/admin/plans'

const PlanRow = ({id, index, name, price, subscription, timestamp}) => {
	const [moreOptions, setMoreOptions] = useState(false)
	const [tabData, setTabData] = useState({
		editTab: {
			open: false,
			toggle: (state) => {
				setTabData({...tabData, editTab: {...tabData.editTab, open: state !== undefined ? state : !tabData.editTab.open}})
			},
			id: id
		}
	})

	useEffect(() => {
		console.log(tabData)
	}, [tabData])

	return (
		<div key = {id} className = 'border-bottom col-12'>
			<div className = 'row a-i-c p-3 po-rel overflow-0'>
				<div className = 'col-1'>
					<div className = 'bold flex-h'>
						<span className = 'flex-1 single-line'>{++index}</span>
					</div>
				</div>
				<div className = 'col'>
					<div className = 'bold flex-h'>
						<span className = 'flex-1 single-line text-capitalize'>{name}</span>
					</div>
				</div>
				<div className = 'col'>
					<div className = 'bold flex-h'>
						<span className = 'flex-1 single-line text-capitalize'>{Currency}{new Intl.NumberFormat().format(price)}</span>
					</div>
				</div>
				<div className = 'col'>
					<div className = 'bold flex-h'>
						<span className = 'flex-1 single-line text-capitalize'>{subscription}</span>
					</div>
				</div>
				<div className = 'col-3'>
					<div className = 'text-capitalize text-muted bold flex-h'>
						<span className = 'flex-1 single-line'>{new Date(timestamp).toDateString()} {new Date(timestamp).toLocaleTimeString()}</span>
					</div>
				</div>
				<div className = 'col-1'>
					<div className = 'text-capitalize text-muted bold text-center'>
						<button onClick = {() => setMoreOptions(!moreOptions)} className = 'bg-clear border-0 px-2'>
							<span className = {`bi bi-${moreOptions ? 'x' : 'three-dots'} fo-s-18`}></span>
						</button>
					</div>
				</div>{
					(moreOptions)
					? (
						<PlansContext.Provider value = {tabData}>
							<EditPlan />
							<div data-id = {id} className = {`col-12 more-options px-3`} style = {{zIndex: '100'}}>
								<div autoFocus = {true} className = 'row a-i-c mt-3 rounded-lg bg-light py-3'>
									<div className = 'col-auto bg-clear'>
										<button onClick = {() => tabData.editTab.toggle()} className = 'btn btn-secondary px-5 py-3 letter-spacing-1 text-capitalize bold'>edit</button>
									</div>
									<div className = 'col-auto text-capitalize bg-clear'>
										<button className = 'btn btn-danger px-5 py-3 letter-spacing-1 text-capitalize bold'>delete</button>
									</div>
								</div>
							</div>
						</PlansContext.Provider>
					)
					: <></>
				}
			</div>
		</div>
	)
}

export default () => {
	const [plansData, setPlansData] = useState()
	const [selectedPlans, setSelectedPlans] = useState([])

	useEffect(() => {
		(async () => {
			const req = await fetch(api_routes.admin.plans.all_plans)
			const {data} = await req.json()

			setPlansData(data)
		})()
	}, [])

	return (
		<Template>
			<div className = 'container-fluid p-0 bg-white rounded-1x oveflow-0 shadow-sm'>
				<div className = 'row a-i-c p-3'>
					<div className = 'col'>
						<div className = 'bold flex-h text-dark'>
							<span className = 'flex-1 single-line text-uppercase'>plans</span>
						</div>
					</div>
					<div className = 'col-auto'>
						<div className = 'row'>
							<div className = 'col-auto'>
								<button className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-plus-lg fo-s-18'></span>
								</button>
							</div>
							<div className = 'col-auto'>
								<button className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-trash fo-s-18'></span>
								</button>
							</div>
							{/*<div className = 'col-auto'>
								<button className = 'bg-clear border rounded px-2'>
									<span className = 'bi bi-pencil fo-s-18'></span>
								</button>
							</div>*/}
						</div>
					</div>
				</div>
				<div className = 'col-12 overflow-x-auto'>
					<div style = {{minWidth: '650px'}}>
						<div className = 'row bg-light a-i-c p-3'>
							<div className = 'col-1'>
								<div className = 'text-capitalize text-muted bold'>S/N</div>
							</div>
							<div className = 'col'>
								<div className = 'text-capitalize text-muted bold'>name</div>
							</div>
							<div className = 'col'>
								<div className = 'text-capitalize text-muted bold'>price</div>
							</div>
							<div className = 'col'>
								<div className = 'text-capitalize text-muted bold'>subscription</div>
							</div>
							<div className = 'col-3'>
								<div className = 'text-capitalize text-muted bold'>time created</div>
							</div>
							<div className = 'col-1'>
								<div className = 'text-capitalize text-muted bold text-center'>more</div>
							</div>
						</div>
						<div className = 'row'>{
							plansData && plansData.map((planData, index) => (
								<PlanRow index = {index} key = {planData.id} {...planData} />
							))
						}</div>
					</div>
				</div>
			</div>
		</Template>
	)
}
