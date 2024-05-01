import {IToken} from '../../interfaces/token.interface';
import './SelectListItem.css';

interface SelectListItemProps {
    token: IToken;
    onClick: (token: IToken) => void;
}

const SelectListItem = ({token, onClick}: SelectListItemProps) => {
    return (
        <div className="select-list-item-div" onClick={() => onClick(token)}>
            <div className="select-list-item-wrapper">
                <img src={token.imagePath} alt="" />
                <div className="select-list-item-info">
                    <p className="select-list-item-ccy">{token.name}</p>
                    <p className="select-list-item-qty">0.00 {token.name}</p>
                </div>
            </div>
            <div className="select-list-item-balance">$0.00</div>
        </div>
    );
};

export default SelectListItem;
