import { TwoOperatorsTemplate } from "./templates/TwoOperatorsTemplate";

export const AdditionOperation = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined;
    }) => {

    return <TwoOperatorsTemplate {...props} symbol="➕" />;
};