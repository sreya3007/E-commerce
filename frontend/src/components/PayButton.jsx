import axios from "axios";
import { UseSelector, useSelector } from "react-redux";
import { url } from "../slices/api";

const PayButton = ({ orderItems }) => {
    const user = useSelector((state) => state.auth)

    const handleCheckout = () => {
        axios.post(`${url}/api/stripe/create-checkout-session`, {
            orderItems,
            userId: user._id
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    };
    return (
        <>
            <button onClick={() => handleCheckout()}>Check Out</button>
        </>
    )
};
export default PayButton;