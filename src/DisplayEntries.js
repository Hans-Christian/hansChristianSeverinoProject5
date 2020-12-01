const DisplayEntries = (props) =>{
    const {entries, callback} = props;
    // console.log();
    return(
        <div>
            {
                entries.map((entry) =>{
                    return(
                        <div key={entry.id}>
                            <h2>{entry.title}</h2>
                            <p>{entry.entry}</p>
                            <button onClick={() => callback(entry.id)}>Delete Entry</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayEntries