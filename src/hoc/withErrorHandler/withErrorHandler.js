import React, {Fragment, useEffect, useState} from "react";
import Modal from "../../components/UI/Modal/Modal";

const useErrorHandler = (axios) => {
    const [error, setError] =useState(null);

    useEffect(() => {
        const reqInterceptor = axios.interceptors.request.use((req) => {
            setError(null);
            return req;
        });

        const resInterceptor = axios.interceptors.response.use(
            (res) => res,
            (err) => {
                setError(err);
                /*return Promise.reject(err);*/
            }
        );

        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [axios]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return {error,errorConfirmedHandler};
};

const ErrorHandler = ({ children,axios }) => {
    const {error,errorConfirmedHandler} = useErrorHandler(axios);

    return (
        <Fragment>

                <Modal show={error} clicked={errorConfirmedHandler} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>

            {children}
        </Fragment>
    );
};

const WithErrorHandler = (WrappedComponent,axios) => {
    return (props) => {
        return (
            <ErrorHandler axios={axios}>
                <WrappedComponent {...props} />
            </ErrorHandler>
        );
    };
};

export default WithErrorHandler;
