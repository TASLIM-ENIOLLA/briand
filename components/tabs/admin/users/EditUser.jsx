export const EditUser = () => {
	return (
		<>
			<h4 className = 'text-center p-3'>Edit User</h4>
			<div className = 'container-fluid py-5'>
				<div className = 'row'>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>full name</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>phone</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-12 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>email address</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-12 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>wallet balance</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>referral ID</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>referree ID</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>business category</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-6 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>plan subscription</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-12 mb-4'>
						<div className = 'mb-2 text-capitalize bold text-dark'>status</div>
						<input type = 'text' className = 'p-3 d-block w-100 rounded bg-clear border border-dark' />
					</div>
					<div className = 'col-12 mt-4'>
						<input type = 'button' value = 'update' className = 'px-3 py-4 d-block w-100 rounded btn btn-success bold letter-spacing-1 text-uppercase' />
					</div>
				</div>
			</div>
		</>
	)
}