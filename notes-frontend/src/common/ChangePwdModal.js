import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import InputPwd from "./InputFormPw";
import { passwordValidation } from "../utils/inputValidations";
import "../styles/resetPassword.css";

function ChangePwdModal({ isOpen, closeModal }) {
  const [messageFromSever, setMsg] = useState();

  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const response = await axiosPrivate.post("/users/update-email", data);
      setMsg({ type: "success", message: response.data.message });
      methods.reset();
    } catch (err) {
      setMsg({ type: "error", message: "--*Invalid email--" });
      return;
    }
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="note-form w-full max-w-md transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                <div className="mt-2">
                  <span className="text-sm text-black">
                    <FormProvider {...methods}>
                      <section className="reset-pwd-form-wrapper">
                        <section className="call-to-action reset-pwd">
                          <h1 className="reset-pwd">
                            <span>NOTES</span>
                          </h1>
                          <p>
                            Please enter your new password, make sure both
                            passwords entered inside each field are the same.
                          </p>
                        </section>
                        {messageFromSever && (
                          <DisplayMessage
                            type={messageFromSever.type}
                            message={messageFromSever.message}
                          />
                        )}
                        <form
                          onSubmit={(e) => e.preventDefault()}
                          noValidate
                          className="form reset-pwd"
                        >
                          <InputPwd {...passwordValidation} isLoggin={false} />
                          <InputPwd
                            {...passwordValidation}
                            label="Re-enter password"
                            id="reEnterPassword"
                            isLoggin={false}
                          />
                          <button onClick={onSubmit}>Reset Password</button>
                        </form>
                      </section>
                    </FormProvider>
                  </span>
                </div>

                <div className="flex justify-evenly mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onSubmit}
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function DisplayMessage({ type, message }) {
  return <span className={type}>{message}</span>;
}

export default ChangePwdModal;
