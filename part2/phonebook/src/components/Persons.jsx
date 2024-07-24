const Persons = ({ personsToShow, deleteEntry }) => {
    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.name}>{person.name} {person.number} <button onClick={() => deleteEntry(person.id)}>Delete</button></p>
            )}
        </div>    
    )
}
export default Persons