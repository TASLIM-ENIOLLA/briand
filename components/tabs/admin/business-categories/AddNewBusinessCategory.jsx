import {useState, useContext} from 'react'

import {api_routes} from '/config'
import {parseObjectToFormData} from '/functions'
import {notify} from '/components/popups'

import {AddNewBusinessCategoryContext} from '/contexts/tabs/admin/business-categories/AddNewBusinessCategory'

export const AddNewBusinessCategory = () => {
	const [formData, setFormData] = useState({name: ''})
	const {id, open, close, updateCategoryData} = useContext(AddNewBusinessCategoryContext)

	return (
		<section className = 'vh100 p-5 animated fadeIn vw100 pt-5 overflow-y-auto po-fixed top-0 left-0' style = {{background: `rgba(0,0,0,.5)`}}>
			<div className = 'animated slideInDown bg-white rounded-1x px-4 py-4 my-5 po-rel mx-auto overflow-0' style = {{maxWidth: '450px'}}>
				<button onClick = {() => close()} className = 'po-abs top-0 right-0 border-0 rounded bg-danger px-3 py-2'>
					<span className = 'bi bi-x fo-s-18 text-white'></span>
				</button>
				<h5 className = 'text-center bold my-4 text-muted'>Add New Business Category</h5>
				<div className = 'py-4 container'>
					<div className = 'row'>
						<div className = 'col-12 mb-3'>
							<div className = 'mb-2 bold text-muted'>Category name</div>
							<input type = 'text' value = {formData.value} onChange = {(e) => setFormData({...formData, name: e.target.value})} className = 'd-block w-100 p-3 border rounded border-muted' />
						</div>
						<div className = 'col-12 mt-3'>
							<input onClick = {() => AddNewBusinessCategoryAction(formData).then(
								({type, data, category_data}) => notify({
									type: type === 'success' ? type : 'danger',
									message: data,
									onSuccessful: () => {
										updateCategoryData(category_data)
										console.log(data, category_data)
									}
								})
							)} type = 'button' value = 'create new category' className = 'd-block w-100 p-3 btn btn-success text-capitalize bold letter-spacing-1' />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const AddNewBusinessCategoryAction = (formData) => fetch(
	api_routes.admin.business_category.add_new_category, {
		method: 'POST',
		body: parseObjectToFormData(formData)
	}
).then(e => e.json())