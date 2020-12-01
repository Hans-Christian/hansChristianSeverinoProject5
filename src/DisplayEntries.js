const DisplayEntries = (props) =>{
    const {entries, deleteEntry} = props;
    return(
        <div>
            {
                entries.map((entry) =>{
                    return(
                        <div key={entry.id}>
                            <h2>{entry.title}</h2>
                            <p>{entry.entry}</p>
                            <button onClick={deleteEntry}>Delete Entry</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayEntries