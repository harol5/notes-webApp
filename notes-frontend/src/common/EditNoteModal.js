import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Fieldset from "./Fieldset";

function EditNoteModal({ isOpen, note, closeModal, setUpdatedNotes }) {
  const axiosPrivate = useAxiosPrivate();

  const methods = useForm({ mode: "onTouched" });
  const onSubmit = methods.handleSubmit((data) => {
    const currentDate = new Date().toString().split(" ").slice(0, 5).join(" ");
    const updatedNote = { ...note, ...data, date_updated: currentDate };

    const editNote = async () => {
      try {
        await axiosPrivate.put(`/notes/${note.id}`, updatedNote);
        setUpdatedNotes(updatedNote);
      } catch (err) {
        console.log(err.response.status);
      }
    };
    editNote();
    methods.reset();
    closeModal();
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
                  Edit Note
                </Dialog.Title>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    <FormProvider {...methods}>
                      <form onSubmit={(e) => e.preventDefault()} noValidate>
                        <Controller
                          control={methods.control}
                          name="title"
                          rules={{ required: "Title can not be empty" }}
                          defaultValue={note?.title}
                          render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                          }) => {
                            return (
                              <div className="input-container">
                                <label htmlFor="title">
                                  <h1>Note Title</h1>
                                </label>
                                {error && (
                                  <InputError
                                    message={error.message}
                                    key={error.message}
                                  />
                                )}
                                <input
                                  type="text"
                                  id="title"
                                  onBlur={onBlur} // notify when input is touched
                                  onChange={onChange} // send value to hook form
                                  value={value}
                                  name={name}
                                />
                              </div>
                            );
                          }}
                        />
                        <Controller
                          control={methods.control}
                          name="content"
                          rules={{ required: "Content can not be empty" }}
                          defaultValue={note?.content}
                          render={({
                            field: { onChange, onBlur, value, name },
                            fieldState: { error },
                          }) => {
                            return (
                              <div className="textare-container">
                                <label htmlFor="content">
                                  <h1>Note Content</h1>
                                </label>
                                {error && (
                                  <InputError
                                    message={error.message}
                                    key={error.message}
                                  />
                                )}
                                <textarea
                                  id="content"
                                  onBlur={onBlur} // notify when input is touched
                                  onChange={onChange} // send value to hook form
                                  value={value}
                                  name={name}
                                  rows="8"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 white:bg-gray-700  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                            );
                          }}
                        />
                        <Fieldset>
                          <div className="">
                            <input
                              type="radio"
                              id="todo"
                              value="todo"
                              {...methods.register("category")}
                              checked
                            />
                            <label htmlFor="todo">todo</label>
                          </div>
                          <div className="">
                            <input
                              type="radio"
                              id="reminder"
                              value="reminder"
                              {...methods.register("category")}
                            />
                            <label htmlFor="reminder">reminder</label>
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
                    Edit Note
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

function InputError({ message }) {
  return <span className="error">*{message}</span>;
}

export default EditNoteModal;
