import {useContext} from 'react'

import {PlansContext} from '/contexts/tabs/admin/plans'

export default () => {
	const {editTab: {open, toggle, id}} = useContext(PlansContext)

	useEffect(() => {
		if(open){
			
		}
	}, [open])

	return (
		<div className = {`${!open ? 'd-none' : 'animated fadeIn'} z-index-1000 vh100 vw100 po-fixed p-5 top-0 left-0 bg-dark-lucent`}>
			<div className = 'mt-5 bg-white rounded-1x shadow overflow-0 mx-auto p-4 po-rel' style = {{maxWidth: '500px'}}>
				<button onClick = {() => toggle(false)} className = 'bg-danger border-0 rounded-lg px-3 py-2 po-abs right-0 top-0'>
					<span className = 'bi bi-x fo-s-18 text-white'></span>
				</button>
				<h5 className = 'p-4 bold text-center'>Edit Plan</h5>
				<div className = 'py-4'>
					<div className = 'container-fluid'>
						<div className = 'row'>
							<div className = 'col-12 mb-4'>
								<div className = 'mb-2 bold text-capitalize'>Plan name</div>
								<input type = 'text' className = 'p-3 border border-dark rounded d-block w-100' />
							</div>
							<div className = 'col-12 mb-4'>
								<div className = 'mb-2 bold text-capitalize'>Plan price</div>
								<input type = 'number' className = 'p-3 border border-dark rounded d-block w-100' />
							</div>
							<div className = 'col-12 mb-4'>
								<div className = 'mb-2 bold text-capitalize'>Plan subscription</div>
								<input type = 'text' className = 'p-3 border border-dark rounded d-block w-100' />
							</div>
							<div className = 'col-12 mt-4'>
								<input type = 'button' value = 'save changes' className = 'text-uppercase bold letter-spacing-1 p-3 btn btn-success d-block w-100' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<style jsx>{`
				.z-index-1000{
					z-index: 1000;
				}
				.bg-dark-lucent{
					background: rgba(0,0,0,.5);
				}
			`}</style>
		</div>
	)
}
