import React, {ChangeEvent, useState} from 'react';
import Icon from "../icon/Icon";
import './InfoEditable.scss'

interface IInfoEditable {
	value: string
	onChange: (event: ChangeEvent<HTMLInputElement>, field: string) => any
	field: string
	title?: string
	editable?: boolean
}

const InfoEditable: React.FC<IInfoEditable> = ({
	value,
    onChange,
	field,
	title,
	editable = true,

}) => {

	const [isInEditMode, setIsInEditMode] = useState(false)

	return (
		<div className="info__editable">
			<h4>
				{ title }
				{ editable &&
					<span onClick={() => setIsInEditMode(prevState => !prevState)}>
						<Icon name={'edit'} size={20} />
					</span> }
			</h4>
			{ !isInEditMode
				?
					<span>
						{ value }
					</span>
				: <div>
					<input value={value} onChange={(e) => onChange(e, field)} />
				</div>
			}
		</div>
	);
};

export default InfoEditable;