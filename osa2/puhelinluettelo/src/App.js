import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personsService from './services/personsService'
import Notification from './components/Notification'

const personOnList = (persons, name) => {
  return persons.some(person => person.name === name)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  const isError = newMessage === null ? null : newMessage.isError

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewPerson = () => {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService
      .addPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewMessage(
          { display: `Added ${returnedPerson.name}`, isError: false }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
      .catch(error => {
        alert('error with adding new person', error)
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = personToDelete => {
    const confirm = window.confirm(`Delete ${personToDelete.name} from the list?`)
    if (confirm) {
      personsService
        .deletePerson(personToDelete.id)
        .then(res => {
          console.log(res)
          console.log(res.data)
          const changedPersons = persons.filter(p => p.id !== personToDelete.id)
          setPersons(changedPersons)
          setNewMessage(
            { display: `Deleted ${personToDelete.name}`, isError: false }
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })
    }
  }

  const handleUpdate = (name) => {
    const personToUpdate = persons.find(person => person.name === name)
    const changedPerson = { ...personToUpdate, number: newNumber }

    personsService
      .updatePerson(changedPerson.id, changedPerson).then(returnedPerson => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
        setNewMessage(
          { display: `Updated number for ${personToUpdate.name}`, isError: false }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNewMessage(
          { display: `The person ${personToUpdate.name} was already deleted from server`, isError: true }
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
    setNewName('')
    setNewNumber('')
  }

  const handleAddPerson = (e) => {
    e.preventDefault()

    if (personOnList(persons, newName)) {
      const confirmPersonModify = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
      if (confirmPersonModify) {
        handleUpdate(newName)
      }
    }
    else {
      handleNewPerson()
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} isError={isError} />
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />

      <AddPersonForm
        addPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Persons persons={persons} newFilter={newFilter} handleDelete={deletePerson} />
    </div>
  )

}

export default App