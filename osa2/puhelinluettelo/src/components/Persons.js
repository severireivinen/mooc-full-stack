import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter }) => {
    const nameFilter = (person) => (
        person.name.toUpperCase().match(newFilter.toUpperCase())
    )

    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {persons.filter(nameFilter).map(person =>
                    <Person key={person.name} name={person.name} number={person.number} />
                )}
            </ul>
        </div>
    )
}

export default Persons