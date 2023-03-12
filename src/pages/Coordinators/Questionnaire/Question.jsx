const Question = (props) => {

    const question = props.question;

    return <p>* {question.content}</p>
}

export default Question;