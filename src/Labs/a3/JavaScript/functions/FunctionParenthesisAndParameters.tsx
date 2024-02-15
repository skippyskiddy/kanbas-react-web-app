



function FunctionParenthesisAndParameters () { 

    const square  = (a: number) => a * a;
    const plusOne = (a: number) => a + 1;
    const twoSquared = square(2);
    const threePlusOne = plusOne(3);

     return (
    <>
      <h2>Parantheses and Parameters </h2>
      twoSquared = { square(2) }<br />
      square(2) = { twoSquared }<br />
      threePlusOne = { plusOne(3) }<br />
      plusOne(3) = { threePlusOne }<br />
    </>
  )
}

export default FunctionParenthesisAndParameters;



