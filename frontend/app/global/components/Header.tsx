import Button from "./Button";
import { ButtonProps } from "./Button";
import Snackbar from "./Snackbar";

interface HeaderProps {
 title: string;

 backButton?: ButtonProps;
 rightButton?: ButtonProps;
}

const Header = ({title, backButton, rightButton}:HeaderProps) => {

    return(
        <>
        <header className="fullbleed sticky top-0 z-10 bg-bg uppercase border-b-grey-200 border-b py-16">
            <div className="grid grid-cols-3 grid-rows-1 items-center w-full">
            <>{backButton && <Button {...backButton} />}</>
            <h1 className="justify-self-center col-start-2 font-bold">{title}</h1>
            {rightButton && (<div className="justify-self-end col-start-3"><Button {...rightButton}/></div>)}
            </div>
        </header>
        </>
    )
}
export default Header;

// EXAMPLES OF HOW TO USE IN PAGE
// backButton={{ buttonName:"EXAMPLE", elementType: "link", goBack: true, size: "lg", type: "none", status: "normal", iconName: "back", }}
//OR
// rightButton={{ buttonName:"EXAMPLE", elementType: "link", goBack: true, size: "", type: "none", status: "normal", iconName: "back", }}