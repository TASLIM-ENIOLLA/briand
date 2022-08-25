import '../public/b-icon/font/bootstrap-icons.css'
import '../public/font-awesome/font-awesome/font-awesome.css'
import '../public/animate/animate.css'
import '../public/css/bootstrap.min.css'
import '../public/css/common.css'

import {GlobalContext} from '../contexts/Global'

export default ({Component, pageProps: {userData, accountType, ...otherProps}}) => {

    return (
        <GlobalContext.Provider value = {{userData, accountType}}>
            <Component {...otherProps} />
            <div id = '__popup'></div>
            <div id = '__floating__window'></div>
        </GlobalContext.Provider>
    )
}