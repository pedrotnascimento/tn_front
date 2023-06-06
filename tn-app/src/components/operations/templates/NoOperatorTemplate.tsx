export const NoOperatorsTemplate = (props:
    {
        registerValues: (o: object[] | undefined) => void,
        result: object | undefined,
        symbol: string;
    }) => {

    return <>
        <div>
            {props.symbol}🟰
            <>{props.result ? props.result : "?"}</>
        </div>
    </>;
};