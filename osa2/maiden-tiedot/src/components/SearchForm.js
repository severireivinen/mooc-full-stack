import React from 'react'

const SearchForm = (props) => (
    <div>
        find countries <input value={props.countryName} onChange={props.handleNameChange}/>
    </div>
)

export default SearchForm