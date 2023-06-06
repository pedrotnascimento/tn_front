import { TwoOperatorsTemplate } from "./templates/TwoOperatorsTemplate";

export const MultiplicationOperation = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined;
    }) => {

    return <TwoOperatorsTemplate {...props} symbol="✖️" />;
};