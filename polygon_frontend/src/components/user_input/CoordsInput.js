import React from "react";
import SubmitButton from "../styled_components/SubmitButton";

const CoordsInput = (props) => {

    return (
        <div style={style.inputContainer}>

            <div style={style.inputFields}>
                <div>
                    <p>X</p>
                    <input type="number"
                           name="x"
                           onChange={ props.onChange }
                           ref={props.xRef}
                    />
                </div>

                <div>
                    <p>Y</p>
                    <input type="number"
                           name="y"
                           onChange={ props.onChange }
                           ref={props.yRef}
                    />
                </div>

                <div>
                    <p>Z</p>
                    <input type="number"
                           name="z"
                           onChange={ props.onChange }
                           ref={props.zRef}
                    />
                </div>
            </div>


            <div style={style.horizontalSeparator} />

            <SubmitButton onClick={props.submitVertex}  style={style.sendButton}>
                Submit vertex
            </SubmitButton>

            <div style={style.horizontalSeparator} />
        </div>
    )
};

export default CoordsInput;

const style = {
    //TODO use colors via Theme
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 20,
        border: "2px solid #d7ddff",
        borderRadius: "10px",
        // padding: 5
    },
    inputFields: {
        alignItems: "stretch",
        flex: 1,
    },
    sendButton: {
        flex: 1,
    },

    horizontalSeparator: {
        flex: 1
    },
};