 const ROLE_ADMIN = 3;
const ROLE_MOD = 2;
const ROLE_GUIDE = 1;
const ROLE_USER = 0;

//Reglas para el panel control - Significa que tipo de rol debes tener para hacer la accion

module.exports = {
    ADD_NEW_TOUR: ROLE_GUIDE,
    EDIT_TOUR:ROLE_MOD,
    DELETE_TOUR:ROLE_ADMIN,
    ENTER_PROFILE:ROLE_USER,
    ENTER_CONTROL:ROLE_MOD,
    ADD_RESERVATION:ROLE_USER,
    UPLOAD_IMG:ROLE_USER,
}

