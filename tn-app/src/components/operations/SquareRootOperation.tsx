import { OneOperatorTemplate } from "./templates/OneOperatorTemplate";

export const SquareRootOperation = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined;
    }) => {

    return <OneOperatorTemplate {...props} symbol="√" />;
};