import { AdditionOperation } from "./AdditionOperation";
import { DivisionOperation } from "./DivisionOperation";
import { MultiplicationOperation } from "./MultiplicationOperation";
import { RandomStringOperation } from "./RandomStringOperation";
import { SquareRootOperation } from "./SquareRootOperation";
import { SubtractionOperation } from "./SubtractionOperation";

export const OPERATIONS = new Map<string, any>();

const additionOp = (registerValues: any, result: any) => (
    <AdditionOperation
        registerValues={registerValues}
        result={result} />);
const divisionOp = (registerValues: any, result: any) => (
    <DivisionOperation
        registerValues={registerValues}
        result={result} />
);
const multiplicationOp = (registerValues: any, result: any) => (
    <MultiplicationOperation
        registerValues={registerValues}
        result={result} />
);
const subtractionOp = (registerValues: any, result: any) => (
    <SubtractionOperation
        registerValues={registerValues}
        result={result} />);
const squareRootOp = (registerValues: any, result: any) => (
    <SquareRootOperation
        registerValues={registerValues}
        result={result} />);
const randomStringOp = (registerValues: any, result: any) => (
    <RandomStringOperation
        registerValues={registerValues}
        result={result} />);

OPERATIONS.set("addition", additionOp);
OPERATIONS.set("division", divisionOp);
OPERATIONS.set("multiplication", multiplicationOp);
OPERATIONS.set("subtraction", subtractionOp);
OPERATIONS.set("squareRoot", squareRootOp);
OPERATIONS.set("randomString", randomStringOp);
