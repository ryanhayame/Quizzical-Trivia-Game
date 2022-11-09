

export default function AnswerBtn(props) {

    function getBackgroundColor() {
        if (!props.gameOver) {
            if (props.isSelected) {
                return "#D6DBF5"
            } else {
                return "transparent"
            }
        } else {
            if (props.isSelected && props.isQuestionCorrect) {
                return "#94D7A2"
            } else if (props.isSelected && !props.isQuestionCorrect) {
                return "#F8BCBC"
            } else if (!props.isSelected && props.correctAnswer) {
                return "#94D7A2"
            } else {
                return "transparent"
            }
        }
    }

    function getOpacity() {
        if (!props.gameOver) {
            return "1"
        } else {
            if (props.correctAnswer) {
                return "1"
            } else {
                return "0.6"
            }
        }
    }

    const styles = {
        backgroundColor: getBackgroundColor(),
        borderColor: props.isSelected && !props.gameOver ? "#D6DBF5" : "#4D5B9E",
        opacity: getOpacity()
    }

    return (
        <button 
        style={styles} 
        className="answer-btn" 
        onClick={() => props.makeSelection(props.answerId, props.questionId)}>
            {props.value}
        </button>
    )
}