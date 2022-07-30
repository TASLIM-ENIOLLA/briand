import Template from '../../components/dashboard/template'
import {cookieStore, cryptoGraph} from '../../functions'
import {GlobalContext} from '../../contexts/Global'
import {useContext} from 'react'
import {useRouter} from 'next/router'

export default () => {
	const {back: goBack} = useRouter()
	const {userData} = useContext(GlobalContext)

	return (
		<Template>
			<div className = 'container-fluid'>
				<div className = 'row'>
					<div className = 'bg-white pt-5 pb-4 mb-5 fo-s-15 px-3 col-12 rounded-1x border shadow-sm'>
						<div className = 'col-12 mb-2'>
							<div className = 'text-capitalize bold letter-spacing-1 mb-2'>logout</div>
							<p className = 'mb-4 text-muted'>All progress has been saved. No data will be lost!</p>
						</div>
						<div className = 'flex-h a-i-c'>
							<div className = 'col-12 col-sm-auto mb-2'>
								<input onClick = {() => cookieStore.set({
									name: 'BRIAND',
									value: undefined,
									expires: new Date().getTime() - (3600 * 24 * 30 * 1000),
									path: '/'
								}).then(() => window.location = '/')} type = 'button' className = 'py-3 rounded-lg text-white bold shadow-sm px-5 btn-danger border text-capitalize' defaultValue = 'logout' />
							</div>
							<div className = 'col-12 col-sm-auto mb-2'>
								<input onClick = {() => goBack()} type = 'button' className = 'py-3 rounded-lg text-danger bold px-5 bg-clear border text-capitalize' defaultValue = 'cancel' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Template>
	)
}

export const getServerSideProps = async (context) => {
	const {req: {cookies}} = context
	const briand_cookie = cookies['BRIAND'] ? cookies['BRIAND'] : undefined

	if(!briand_cookie){
		return {
			redirect: {
				destination: '/'
			}
		}
	}
	
	return {
		props: {
			userData: JSON.parse(cryptoGraph.decrypt(briand_cookie))
		}
	}
}