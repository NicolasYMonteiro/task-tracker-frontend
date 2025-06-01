import { cn } from "@lib/utils";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle
} from "@components/ui/dialog";

interface ModalProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    buttonTrigger?: React.ReactNode; // Botão que dispara o modal - <Button />
    icon?: React.ReactNode;
    className?: string;
    size?: "small" | "medium" | "large";
    onClose?: () => void;
    footer?: React.ReactNode;
}

const Modal = ({
    title,
    description,
    children,
    buttonTrigger,
    className,
    onClose,
    footer
}: ModalProps) => {
    return (
        <Dialog onOpenChange={(open) => !open && onClose?.()}>
            <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>

            <DialogContent
                className={cn(
                    "flex flex-col items-center justify-center",
                    "w-[90%] md:w-auto",
                    "bg-white px-8 py-6 md:p-8 rounded-2xl shadow-xl border-2 border-blue-700",
                    className
                )}
            >
                <div
                    className={cn(
                        "w-full md:w-[90%] max-w-lg",
                        "max-h-[90vh] overflow-y-auto",
                        "",
                    )}
                >

                    {title && (
                        <DialogTitle className=" text-center text-2xl font-semibold mb-2">{title}</DialogTitle>
                    )}
                    {description && (
                        <p className="text-gray-600 mb-4">{description}</p>
                    )}

                    <div>{children}</div>

                    {footer && <div className="mt-6">{footer}</div>}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default Modal;
