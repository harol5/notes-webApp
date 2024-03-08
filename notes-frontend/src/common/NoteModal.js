import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Input from "../common/InputForm";
import Textarea from "./TextareaForm";
import Fieldset from "./Fieldset";
import {
  titleNoteValidation,
  contentNoteValidation,
} from "../utils/inputValidations";

function NoteModal({ isOpen, closeModal, setNewNote }) {
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit((data) => {
    //ISSUE: form is not returning all data (category:null);
    console.log(data);

    const currentDate = new Date().toString().split(" ").slice(0, 5).join(" ");
    const updatedNote = {
      ...data,
      dateCreated: currentDate,
      status: "pending",
    };

    const addNotes = async () => {
      try {
        const newNote = await axiosPrivate.post("/notes", updatedNote);
        setNewNote(newNote.data);
      } catch (err) {
        console.log(err.response.status);
      }
    };
    addNotes();

    closeModal();
    methods.reset();
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  New Note
                </Dialog.Title>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    <FormProvider {...methods}>
                      <form onSubmit={(e) => e.preventDefault()} noValidate>
                        <Input {...titleNoteValidation} />
                        <Textarea {...contentNoteValidation} />
                        <Fieldset>
                          <div className="">
                            <input
                              type="radio"
                              id="field-todo"
                              value="todo"
                              {...methods.register("category")}
                              checked
                            />
                            <label htmlFor="field-todo">todo</label>
                          </div>
                          <div className="">
                            <input
                              type="radio"
                              id="field-reminder"
                              value="reminder"
                              {...methods.register("category")}
                            />
                            <label htmlFor="field-reminder">reminder</label>
                          </div>
                        </Fieldset>
                      </form>
                    </FormProvider>
                  </span>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onSubmit}
                  >
                    Create Note
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

export default NoteModal;
