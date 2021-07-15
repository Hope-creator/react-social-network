import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";

const Modal = ({
  children,
  className = "modalBlock",
  el = "div",
  handleClose,
}) => {
  const [container] = React.useState(document.createElement(el));

  container.classList.add(className);
  container.onclick = () => handleClose();

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Modal;
