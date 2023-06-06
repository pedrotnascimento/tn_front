import { TwoOperatorsTemplate } from "./templates/TwoOperatorsTemplate";

export const DivisionOperation = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined;
    }) => {

    return <TwoOperatorsTemplate {...props} symbol="➗" />;
};