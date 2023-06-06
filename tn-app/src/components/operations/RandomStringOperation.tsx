import { NoOperatorsTemplate } from "./templates/NoOperatorTemplate";

export const RandomStringOperation = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined;
    }) => {

    return <NoOperatorsTemplate {...props} symbol="🎉" />;
};