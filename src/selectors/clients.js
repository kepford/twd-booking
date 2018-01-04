// Get clients

export default (clients, { text }) => {
  return clients.filter((client) => {
    const textMatch = client.clientName.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  });
};
