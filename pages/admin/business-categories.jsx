import ReactDOM from 'react-dom'
import {useEffect, useState} from 'react'

import {api_routes} from '/config'
import {cryptoGraph, parseObjectToFormData} from '/functions'

import Template from '/components/dashboard/Template'
import {notify} from '/components/popups'

import {AddNewBusinessCategory} from '/components/tabs/admin/business-categories/AddNewBusinessCategory'
import {AddNewBusinessCategoryContext} from '/contexts/tabs/admin/business-categories/AddNewBusinessCategory'



export default () => {
	const [categoriesData, setCategoriesData] = useState()
	const [selectedCategories, setSelectedCategories] = useState([])
	class AddNewBusinessCategoryAction{
		open(setCategoriesData){
			ReactDOM.render(
				<AddNewBusinessCategoryContext.Provider value = {this}>
	        		<AddNewBusinessCategory />
				</AddNewBusinessCategoryContext.Provider>,
		        document.querySelector('#__floating__window')
		    )
		}
		updateCategoryData(data){
			setCategoriesData([
				data,
				...categoriesData,
			])
		}
		close(){
			ReactDOM.unmountComponentAtNode(
	            document.querySelector(`#__floating__window`)
	        )
		}
	}

	const addNewBusinessCategoryAction = new AddNewBusinessCategoryAction()

	useEffect(() => {
		(async () => {
			const req = await fetch(api_routes.admin.business_category.all_categories)
			const {data} = await req.json()

			setCategoriesData(data)
		})()
	}, [])

	return (
		<Template>
			<div className = 'container-fluid p-0 bg-white rounded-1x oveflow-0 shadow-sm'>
				<div className = 'row a-i-c p-3'>
					<div className = 'col'>
						<div className = 'bold flex-h text-dark'>
							<span className = 'flex-1 single-line text-uppercase'>Business categories</span>
						</div>
					</div>
					<div className = 'col-auto'>
						<div className = 'row'>
							<div className = 'col-auto'>
								<button onClick = {() => addNewBusinessCategoryAction.open(setCategoriesData)} className = {`${selectedCategories.length > 0 ? 'disabled bg-muted' : 'bg-clear'} transit border rounded px-2`}>
									<span className = 'bi bi-plus-lg fo-s-18'></span>
								</button>
							</div>
							<div className = 'col-auto'>
								<button className = {`${(selectedCategories.length !== 1) ? 'disabled bg-muted' : 'bg-clear'} transit border rounded px-2`}>
									<span className = 'bi bi-pencil text-primary fo-s-18'></span>
								</button>
							</div>
							<div className = 'col-auto'>
								<button onClick = {() => DeleteBusinessCategories(selectedCategories).then(
									({data, type}) => notify({
										type: type === 'success' ? type : 'danger',
										message: data,
										callback: () => (
											(type === 'success')
											? (
												setCategoriesData(categoriesData.filter(({id}) => !selectedCategories.includes(id))),
												setSelectedCategories([])
											)
											: undefined
										)
									})
								)} className = {`${(selectedCategories.length < 1) ? 'disabled bg-muted' : 'bg-clear'} border rounded px-2`}>
									<span className = 'bi bi-trash text-danger fo-s-18'></span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className = 'container-fluid overflow-x-auto'>
					<div style = {{minWidth: '450px'}}>
						<div className = 'row p-3 bg-light a-i-c'>
							<div className = 'col-1'>
								<div className = 'text-capitalize text-muted bold'>S/N</div>
							</div>
							<div className = 'col-7'>
								<div className = 'text-capitalize text-muted bold'>name</div>
							</div>
							<div className = 'col-3'>
								<div className = 'text-capitalize text-muted bold'>time created</div>
							</div>
							<div className = 'col-1 text-center'>
								<button onClick = {() => (
									(selectedCategories.length === categoriesData?.length)
									? setSelectedCategories([])
									: setSelectedCategories(categoriesData.map(({id}) => id))
								)} className = 'bg-clear border-0 outline-0'>
									<span className = {`transit fo-s-18 flex-1 single-line bi bi-check-square${
										selectedCategories.length === categoriesData?.length
										? '-fill text-primary'
										: ' text-muted'
									}`}></span>
								</button>
							</div>
						</div>
						<div className = 'row'>{
							categoriesData && categoriesData.map(({id, name, timestamp}, index) => (
								<div key = {id} className = 'border-bottom col-12'>
									<div className = 'row a-i-c p-3'>
										<div className = 'col-1'>
											<div className = 'bold flex-h'>
												<span className = 'flex-1 single-line text-muted'>{++index}</span>
											</div>
										</div>
										<div className = 'col-7'>
											<div className = 'bold flex-h'>
												<span className = 'flex-1 single-line text-muted text-capitalize'>{name}</span>
											</div>
										</div>
										<div className = 'col-3'>
											<div className = 'text-capitalize text-muted bold flex-h'>
												<span className = 'flex-1 single-line'>{new Date(timestamp).toDateString()} {new Date(timestamp).toLocaleTimeString()}</span>
											</div>
										</div>
										<div className = 'col-1 text-center'>
											<button onClick = {() => (
												(!selectedCategories.includes(id))
												? setSelectedCategories([...selectedCategories, id])
												: setSelectedCategories(selectedCategories.filter(each => each !== id))
											)} className = 'bg-clear border-0 outline-0'>
												<span className = {`transit flex-1 single-line bi bi-check-square${
													selectedCategories.includes(id)
													? '-fill text-primary'
													: ' text-muted'
												}`}></span>
											</button>
										</div>
									</div>
								</div>
							))
						}</div>
					</div>
				</div>
			</div>
		</Template>
	)
}

const DeleteBusinessCategories = (selectedCategories) => fetch(api_routes.admin.business_category.delete_categories, {
	method: 'POST',
	body: parseObjectToFormData({ids: selectedCategories})
}).then(e => e.json())