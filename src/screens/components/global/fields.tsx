import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FormEventHandler } from 'react'
import '../styles/components.css'
type Props = {
	icon?: IconDefinition,
	placeholder: string,
	value: string,
	onChange: (e: any) => void,
	disabled: boolean,
	color?: string,
	title?: string,
	type?: string,
	
}

export const LoginFields = ({
		title,
		color,
		disabled, 
		icon, 
		onChange, 
		value, 
		placeholder,
		type
	}: Props) => {

  return (
	<>
	{title && <p className='header-title'>{title}</p>}
    <div className='global-input'>
			<input
				type={type || 'text'}
				disabled  = {disabled}
				onChange={onChange} 
				value = {value} 
				placeholder={placeholder}
				color='#8FABD3'
				/>
			{icon && <FontAwesomeIcon icon={icon} color= {color || '#8FABD3'}  />}
    </div>
	</>
  )
}

export const LargeTextField = ({
	title,
	color,
	disabled, 
	icon, 
	onChange, 
	value, 
	placeholder,
	type
}: Props) => {

return (
<>
{title && <p className='header-title'>{title}</p>}
<div className='global-large-text-field'>
		<textarea
			disabled  = {disabled}
			onChange={onChange} 
			value = {value} 
			placeholder={placeholder}
			
			color='#8FABD3'
			/>
		{icon && <FontAwesomeIcon icon={icon} color= {color || '#8FABD3'}  />}
</div>
</>
)
}

type SelectProps = {
	icon: IconDefinition,
	color?: string,
	title: string,
	selection: string[],
	onChange: (e: any) => void,
	placeholder: string,
	value: string,
}

export const  Select = ({
		icon, 
		color,
		title, 
		selection, 
		onChange, 
		placeholder,
		value,
	}: SelectProps) => {
  return (
		<>
		{title && <p className='header-title'>{title}</p>}
		<div className='global-input'>
			<select value = {value} onChange={onChange}>
			{selection && selection.map((item, index) =>(
			<option key={index} value = {item}>{item}</option>
			))}
			</select>
			<FontAwesomeIcon icon={icon} color= {color || '#8FABD3'}  />
		</div>
		</>
  )
}


