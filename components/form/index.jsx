import {useState, useRef, useEffect} from 'react'

export const CheckBox = ({value = false, onChange, title}) => {
	const label = useRef()
	const [checkBoxValue, setCheckBoxValue] = useState(value)

	useEffect(() => typeof onChange === 'function' ? onChange(checkBoxValue) : undefined, [checkBoxValue])

	return (
		<button className = 'bg-clear border-0' onClick = {() => label.current.click()}>
			<label ref = {label} title = {title} className = 'user-select-0' onClick = {() => setCheckBoxValue(!checkBoxValue)}>
				<span className = {`bi bi-record-circle${checkBoxValue ? '-fill' : ''} transit ${checkBoxValue ? 'theme-color' : 'text-muted'}`}></span>
				<span className = 'bold ml-3 text-dark'>{title}</span>
			</label>
		</button>
	)
}

export const Button = ({children, onClick, className, ...buttonProps}) => {
	const [mounted, isMounted] = useState(false)
	const [defaultChildren, setDefaultChildren] = useState(children)
	const [buttonClicked, setButtonClicked] = useState(false)
	const LoadingComponent = () => <span className = 'fa bi-arrow-clockwise fo-s-22 fa-spin'></span>

	useEffect(() => {
		isMounted(true)
		return () => isMounted(false)
	}, [])

	return (
		<button className = {`${buttonClicked ? 'disabled' : ''} ${className}`} onClick = {(e) => new Promise(
			resolved => {
				if(isMounted){
					setButtonClicked(true)
					setDefaultChildren(<LoadingComponent />)
					typeof onClick === 'function' ? resolved(onClick(e)) : resolved()
				}
			}
		).then(e => {
			if(isMounted){
				setTimeout(() => {
					setButtonClicked(false)
					setDefaultChildren(children)
				}, 500)
			}
		})} {...buttonProps}>
			{defaultChildren}
		</button>
	)
}