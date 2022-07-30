import Template from '../../components/dashboard/Template'
import {cryptoGraph} from '../../functions'

export default () => {
	return (
		<Template>
			
		</Template>
	)
}

// export const getServerSideProps = async (context) => {
// 	const {req: {cookies}} = context
// 	const briand_cookie = cookies['BRIAND'] ? cookies['BRIAND'] : undefined

// 	if(!briand_cookie){
// 		return {
// 			redirect: {
// 				destination: '/'
// 			}
// 		}
// 	}
	
// 	return {
// 		props: {
// 			userData: JSON.parse(cryptoGraph.decrypt(briand_cookie))
// 		}
// 	}
// }
