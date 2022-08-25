import {useState, useEffect} from 'react'
import RegisterTabs from '../components/tabs/register'
import {RegisterContext} from '../contexts/tabs/register'

export default ({referree_id}) => {
	const [tabIndex, setTabIndex] = useState(0)
	const [formData, setFormData] = useState({
		full_name: '',
		email: '',
		phone: '',
		password: '',
		c_password: '',
		agreement_consent: false,
		business_category_id: '',
		service_plan_id: '',
		referree_id: referree_id ? referree_id : undefined
	})

	const RegisterContextValue = {
		nextTab: () =>  tabIndex < RegisterTabs.length - 1 ? setTabIndex(tabIndex + 1) : undefined,
		previousTab: () =>  tabIndex > 0 ? setTabIndex(tabIndex - 1) : undefined,
		updateFormData: (formFieldData) => setFormData({...formData, ...formFieldData}),
		getFormData: formData,
	}

	return (
		<section className = 'col-lg-100vh theme-bg container-fluid'>
			<div className = 'row' style = {{flexDirection: 'row-reverse'}}>
				<RegisterContext.Provider value = {RegisterContextValue}>
					<div className = 'col-lg-6'>
						{RegisterTabs[tabIndex][0]}
						
					</div>
					<div className = 'col-lg-6 bg-white col-rounded-y-plus-2x col-lg-rounded-x-plus-2x'>
						{RegisterTabs[tabIndex][1]}
						
					</div>
				</RegisterContext.Provider>
			</div>
			<style jsx>{`
				.line-h-150pcent{
					line-height: 150%;
				}
			`}</style>
		</section>
	)
}

export const getServerSideProps = async (context) => {
	const {req: {cookies}, query: {referree_id}} = context
	const briand_cookie = cookies['BRIAND'] ? cookies['BRIAND'] : undefined

	if(!referree_id && briand_cookie){
		return {
			redirect: {
				destination: '/dashboard'
			}
		}
	}
	
	return {
		props: {
			referree_id: referree_id ? referree_id : null
		}
	}
}