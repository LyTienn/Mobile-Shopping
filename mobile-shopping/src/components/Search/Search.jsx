import './Search.css';

const Search = ({ value, onChange, ...props }) => {
    return (
        <div className="search-container w-48 sm:w-64 md:w-80 lg:w-96">
            <input 
                type="text" 
                className="search-input h-1" 
                placeholder="Search..."
                value={value}
                onChange={ onChange }
                {...props} 
            />
        </div>
    );
};

export default Search;
