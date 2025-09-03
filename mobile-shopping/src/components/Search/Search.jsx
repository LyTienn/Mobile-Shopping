import './Search.css';
import search from '../../assets/images/Search.png';

const Search = ({ value, onChange, ...props }) => {
    return (
        <div className="search-container">
            <input 
                type="text" 
                className="search-input h3" 
                placeholder="Search..."
                value={value}
                onChange={ onChange }
                {...props} 
            />
            <span className='search-icon'>
                <img src={search} alt='search' />
            </span>
        </div>
    );
};

export default Search;
