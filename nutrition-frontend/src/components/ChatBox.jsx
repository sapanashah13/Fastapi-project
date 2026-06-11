export default function ChatBox({ messages }) {
  return (
    <div style={styles.container}>
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            ...styles.message,
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            backgroundColor: msg.role === "user" ? "#DCF8C6" : "#F1F1F1"
          }}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto"
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "60%"
  }
};