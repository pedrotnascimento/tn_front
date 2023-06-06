import { AdditionOperation } from "./AdditionOperation";
import { DivisionOperation } from "./DivisionOperation";
import { MultiplicationOperation } from "./MultiplicationOperation";
import { RandomStringOperation } from "./RandomStringOperation";
import { SquareRootOperation } from "./SquareRootOperation";
import { SubtractionOperation } from "./SubtractionOperation";

export const OPERATIONS = new Map<
    string,
    { type: string, name: string, getWidget: any; }
>();

const widgetFactory = (type: string, name: string, Widget: any) => {
    return {
        type,
        name,
        getWidget: (registerValues: any, result: any) => (
            <Widget
                registerValues={registerValues}
                result={result} />)
    };
};

const additionOp = widgetFactory("addition", "Addition", AdditionOperation);
const divisionOp = widgetFactory("division", "Division", DivisionOperation);
const multiplicationOp = widgetFactory("multiplication", "Multiplication", MultiplicationOperation);
const subtractionOp = widgetFactory("subtraction", "Subtraction", SubtractionOperation);
const squareRootOp = widgetFactory("square_root", "Square Root", SquareRootOperation);
const randomStringOp = widgetFactory("random_string_generation", "Random String", RandomStringOperation);

OPERATIONS.set(additionOp.type, additionOp);
OPERATIONS.set(divisionOp.type, divisionOp);
OPERATIONS.set(multiplicationOp.type, multiplicationOp);
OPERATIONS.set(subtractionOp.type, subtractionOp);
OPERATIONS.set(squareRootOp.type, squareRootOp);
OPERATIONS.set(randomStringOp.type, randomStringOp);
