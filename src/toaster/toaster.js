import { toast } from "react-toastify";
import { css } from "glamor";

export default class Toaster {
  constructor(toastId) {
    this.toastId = toastId || "mainToastId";
    this.timeOut = 2000;
    this.transitionClass = css({
      transform: "rotateY(360deg)",
      transition: "transform 0.6s"
    });
  }
  info(msg) {
    toast(msg, {
      type: toast.TYPE.INFO,
      autoClose: this.timeOut,
      toastId: this.toastId
    });
  }
  inProgress(msg) {
    toast(msg || "Please wait...", {
      autoClose: false,
      type: toast.TYPE.DEFAULT,
      toastId: this.toastId
    });
  }
  updateProgress(msg) {
    toast.update(this.toastId, {
      render: msg,
      autoClose: false,
      type: toast.TYPE.DEFAULT,
      className: this.transitionClass
    });
  }
  update(msg) {
    toast.update(this.toastId, {
      render: msg,
      autoClose: this.timeOut,
      type: toast.TYPE.SUCCESS,
      className: this.transitionClass
    });
  }
  updateError(msg) {
    toast.update(this.toastId, {
      render: msg,
      autoClose: false,
      type: toast.TYPE.ERROR,
      className: this.transitionClass
    });
  }
  updateSuccess(msg) {
    toast.update(this.toastId, {
      render: msg,
      autoClose: this.timeOut,
      type: toast.TYPE.SUCCESS,
      className: this.transitionClass
    });
  }
}
