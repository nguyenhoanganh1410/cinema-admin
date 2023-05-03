import { useSelector } from "react-redux";

export const IsManager = () => {
    const user = useSelector((state) => state.user);
    console.log(user);
}