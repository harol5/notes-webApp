export const nameValidation = {
  label: "Name",
  type: "text",
  id: "name",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const emailValidation = {
  label: "Email",
  type: "email",
  id: "email",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "not valid",
    },
  },
};

export const usernameValidation = {
  label: "Username",
  type: "username",
  id: "username",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const passwordValidation = {
  label: "Password",
  type: "password",
  id: "password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
      message:
        "Password must contains: Minimum eight characters, at least one uppercase letter, one lowercase letter, one special character (#?!@$%^&*-)",
    },
  },
};

export const passwordLoginValidation = {
  label: "Password",
  type: "password",
  id: "password",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 30,
      message: "30 characters max",
    },
  },
};

export const titleNoteValidation = {
  label: "Note Title",
  type: "text",
  id: "title",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 50,
      message: "50 characters max",
    },
  },
};

export const categoryTodoNoteValidation = {
  label: "todo",
  type: "radio",
  id: "todo",
  name: "category",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const categoryReminderNoteValidation = {
  label: "reminder",
  type: "radio",
  id: "reminder",
  name: "category",
  validation: {
    required: {
      value: true,
      message: "required",
    },
  },
};

export const contentNoteValidation = {
  label: "Note Content",
  id: "content",
  validation: {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 250,
      message: "250 characters max",
    },
  },
};
