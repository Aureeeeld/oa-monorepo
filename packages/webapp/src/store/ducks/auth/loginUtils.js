export const openLoginPopup = socket => {
  const width = 600;
  const height = 800;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  const url = `${process.env.REACT_APP_API_ENDPOINT}/discord/auth?socketId=${socket.id}`;

  return window.open(
    url,
    "",
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${width},
    height=${height}, top=${top}, left=${left}`
  );
};
