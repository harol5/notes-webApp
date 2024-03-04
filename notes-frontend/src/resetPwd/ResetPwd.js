const ResetPwd = () => {
  const code = new URLSearchParams(window.location.search).get("code");
  console.log(code);

  //TODO: create a form that will ask user to input anew password twice
  //then will send an ajax request with the code attached.
  return <h1>reset pwd form</h1>;
};

export default ResetPwd;
