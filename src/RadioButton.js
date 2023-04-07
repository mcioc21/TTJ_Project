
function RadioButton({choice, setChoice}){

    const onOptionChange = e => {
      setChoice(e.target.value)
    }
  
    return (
      <div className="radio-button">
        <h3>Select your choice</h3>
  
        <input
          type="radio"
          name="choice"
          value="Text"
          id="text"
          checked={choice === "Text"}
          onChange={onOptionChange}
        />
        <label htmlFor="text">Text</label>
  
        <input
          type="radio"
          name="choice"
          value="Image"
          id="image"
          checked={choice === "Image"}
          onChange={onOptionChange}
        />
        <label htmlFor="image">Image</label>
  
        <p>
          Selected choice(default text) <strong>{choice}</strong>
        </p>
      </div>
    )
  }

  export default RadioButton