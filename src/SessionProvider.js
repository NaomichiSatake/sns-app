import { createContext, useState, useEffect } from "react";
import { authRepository } from "./repositories/auth";

const SessionContext = createContext();
const SessionProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        setSession();
    }, []);

    const setSession = async () => {
        const user = await authRepository.getCurrentUser();
        setCurrentUser(user); // 正しい user 情報をセット
        setIsloading(false); // ローディング完了を示す
    };

    if (isLoading) return <div />; // ローディング中は空のdivを表示

    return (
        <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
            {props.children}
        </SessionContext.Provider>
    );
};

export { SessionContext, SessionProvider };
