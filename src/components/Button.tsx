interface ButtonProps {
    title: string;
    classes: string;
}

const Button = ({ title, classes } : ButtonProps) => {
    return (
        <>
            <button className={classes}>{ title }</button>
        </>
    )
}