import React from "react";

const CoordsInput = (props) => {

    return (
        <React.Fragment>
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

        </React.Fragment>
    )
};

export default CoordsInput;