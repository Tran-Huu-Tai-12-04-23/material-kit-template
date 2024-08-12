import { Button, alpha } from "@mui/material";

function ButtonPrimary({children, ...props}) {
    return <Button onClick={ props?.disabled ? () => {} : props?.onClick} {...props} sx={{
        color: "#1877F2",
        background: alpha("#1877F2", 0.2),
        pl: 2, pr: 2,
        textTransform: "Capitalize",
        fontWeight: 400,
        "&:hover": {
            background: alpha("#1877F2", 0.3),
        }
    }}>{children}</Button>;
}


function ButtonOutlined({children, ...props}) {
    return<Button onClick={ props?.disabled ? () => {} : props?.onClick} {...props}sx={{
        color: "#1877F2",
        border: "1px solid",
        borderColor: alpha("#1877F2", 0.2),
        pl: 2, pr: 2,
        textTransform: "Capitalize",
        fontWeight: 400,
        "&:hover": {
          borderColor: alpha("#1877F2", 0.3),
        }
    }}>{children}</Button>;
}

export {
    ButtonOutlined, ButtonPrimary
};

