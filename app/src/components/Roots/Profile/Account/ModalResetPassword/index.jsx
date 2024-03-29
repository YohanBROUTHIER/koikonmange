import { useState } from "react";
import { UserApi } from "../../../../../api"
import { Form, redirect} from 'react-router-dom';

import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";

const ModalResetPassword = ({setOpenCloseModal}) => {
    
    const {email} = useSelector((state) => state.session);

    const handleSubmitResetPassword = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = Object.fromEntries(formData);
        const {newPassword, confirmPassword} = dataForm;
        // if (password === mot pde passe actuel )
        if (newPassword === confirmPassword) {
            await UserApi.RequestResetPasword({email});
        }
    }

    const handleClickCloseModal = () => {
        setOpenCloseModal(false);
    }

    return(
        <div className="backdrop">
                    <div className="modalProfil modal">
                        <Form className="formResetPassword" onSubmit={handleSubmitResetPassword}>
                            <div>
                                <label htmlFor="actualPassword">
                                    Mot de passe actuel :
                                </label>
                                <input id="actualPassword" type="text" name="actualPassword"/>
                            </div>

                            <div>
                                <label htmlFor="newPassword">
                                    Nouveau mot de passe :
                                </label>
                                <input id="newPassword" type="text" name="newPassword"/>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirmation de mot de passe :
                                </label>
                                <input id="confirmPassword" type="text" name="confirmPassword"/>
                            </div>

                            <button>Changer le mot de passe</button>
                        </Form>
                        <MdCancel className="cancelModal" onClick={handleClickCloseModal}/>
                    </div>
                </div>
    )
}

export default ModalResetPassword;