import { Zoom, toast } from 'react-toastify';

function error(error) {
  let message = error.message;
  if (error.httpStatus) {
    message =
    `Erreur ${error.httpStatus} :
    ${message}`;
  }

  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom
  });
}
function success(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
}





export default {
  error,
  success
}

