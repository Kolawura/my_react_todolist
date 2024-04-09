// eslint-disable-next-line react/prop-types
const Error = ({error, error1}) => {

  return (
  <>
    { error && 
        <p className="error">Sorry input cannot be empty!</p>
    }
   { error1 && 
        <p className="error">Please Submit or clear input text first</p>
    }</>
    )
}

export default Error
